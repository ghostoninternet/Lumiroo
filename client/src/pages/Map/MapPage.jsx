import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder';
import SearchBox from '../../components/Map/SearchBox';
import MapContainer from '../../components/Map/MapContainer';

const MapPage = () => {
  const location = useLocation();
  const destinationAddress = location.state?.destination || '';
  const playgroundName = location.state?.playgroundName || '';
  
  const [origin, setOrigin] = useState('');
  const [destination] = useState(destinationAddress);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRouteVisible, setIsRouteVisible] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [map, setMap] = useState(null);

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setClickedLocation({ lat, lng });
    
    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.reverse({ lat, lng }, map?.getZoom() || 13, results => {
      if (results.length > 0) {
        setOrigin(results[0].name);
      }
    });
  };

  const handleSearch = async () => {
    if (!origin) return;
    
    setIsLoading(true);
    try {
      const geocoder = L.Control.Geocoder.nominatim();
      
      const originResults = await new Promise((resolve) => {
        if (typeof origin === 'string') {
          geocoder.geocode(origin, results => resolve(results));
        } else {
          resolve([{ center: origin }]);
        }
      });

      const destResults = await new Promise((resolve) => {
        geocoder.geocode(destination, results => resolve(results));
      });

      if (originResults.length > 0 && destResults.length > 0) {
        const originCoords = originResults[0].center;
        const destCoords = destResults[0].center;
        
        if (map) {
          const bounds = L.latLngBounds([originCoords, destCoords]);
          map.fitBounds(bounds, { padding: [50, 50] });
        }

        setIsRouteVisible(true);
        setRouteInfo({
          duration: '15 分',
          distance: '2.7 km'
        });
      }
    } catch (error) {
      console.error('Route calculation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentPos = { lat: latitude, lng: longitude };
          setCurrentLocation(currentPos);
          setClickedLocation(currentPos);
          
          const geocoder = L.Control.Geocoder.nominatim();
          geocoder.reverse(currentPos, map?.getZoom() || 13, results => {
            if (results.length > 0) {
              setOrigin(results[0].name);
            }
          });
          
          if (map) {
            map.setView([latitude, longitude], 15);
          }
          
          setIsLoading(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setIsLoading(false);
        }
      );
    }
  };

  useEffect(() => {
    if (destination && map) {
      const geocoder = L.Control.Geocoder.nominatim();
      geocoder.geocode(destination, results => {
        if (results.length > 0) {
          const { lat, lng } = results[0].center;
          map.setView([lat, lng], 13);
        }
      });
    }
  }, [destination, map]);

  return (
    <div className="h-full flex flex-col" style={{ height: 'calc(100vh - 64px)', marginTop: '64px' }}>
      <div className="relative flex-1">
        <div className="relative h-full">
          <SearchBox
            origin={origin}
            setOrigin={setOrigin}
            destination={destination}
            onSearch={handleSearch}
            isLoading={isLoading}
            onGetCurrentLocation={handleGetCurrentLocation}
          />
          
          <MapContainer
            origin={currentLocation || origin}
            destination={destination}
            isRouteVisible={isRouteVisible}
            onRouteCalculated={(routeData) => setRouteInfo(routeData)}
            onMapClick={handleMapClick}
            onMapLoad={setMap}
            clickedLocation={clickedLocation}
            playgroundName={playgroundName}
          />
          
          {/* Route Info Panel */}
          <AnimatePresence>
            {isRouteVisible && routeInfo && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-6 right-6 bg-white rounded-xl shadow-lg p-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-600">
                      所要時間: {routeInfo.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-600">
                      距離: {routeInfo.distance}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading Overlay */}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPage;