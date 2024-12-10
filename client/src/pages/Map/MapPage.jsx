import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder';
import SearchBox from '../../components/Map/SearchBox';
import MapContainer from '../../components/Map/MapContainer';

const MapPage = ({}) => {
  const location = useLocation();
  const destinationAddress = location.state?.address||"Tây Mỗ, Nam Từ Liêm, Hà Nội";
  // location.state?.destinationAddress || '';
  const playgroundName = location.state?.playgroundName || '';

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(destinationAddress);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRouteVisible, setIsRouteVisible] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    console.log('MapPage mounted with:', { destinationAddress, playgroundName });
  }, []);

  // Handle map click with geocoding
  const handleMapClick = useCallback((event) => {
    console.log('Map clicked:', event.latlng);
    const { lat, lng } = event.latlng;
    setClickedLocation({ lat, lng });

    const geocoder = L.Control.Geocoder.nominatim({
      geocodingQueryParams: { countrycodes: 'vn' }
    });
    geocoder.reverse({ lat, lng }, map?.getZoom() || 13, (results) => {
      if (results.length > 0) {
        console.log('Reverse geocoding result:', results[0]);
        setOrigin(results[0].name);
      }
    });
  }, [map]);

  // Handle search to geocode origin and destination
  const handleSearch = useCallback(async () => {
    console.log('Search triggered with:', { origin, destination });
    if (!origin) {
      console.log('No origin provided');
      return;
    }

    setIsLoading(true);
    try {
      const geocoder = L.Control.Geocoder.nominatim({
        geocodingQueryParams: { countrycodes: 'vn' }
      });

      const originResults = await new Promise((resolve) => {
        if (typeof origin === 'string') {
          geocoder.geocode(origin, (results) => {
            console.log('Origin geocoding results:', results);
            resolve(results);
          });
        } else {
          resolve([{ center: origin }]);
        }
      });

      const destResults = await new Promise((resolve) => {
        geocoder.geocode(destination, (results) => {
          console.log('Destination geocoding results:', results);
          resolve(results);
        });
      });

      if (originResults.length > 0 && destResults.length > 0) {
        const originCoords = originResults[0].center;
        const destCoords = destResults[0].center;

        console.log('Coordinates found:', { originCoords, destCoords });

        if (map) {
          const bounds = L.latLngBounds([originCoords, destCoords]);
          map.fitBounds(bounds, { padding: [50, 50] });
        }

        setIsRouteVisible(true);
      }
    } catch (error) {
      console.error('Route calculation failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [origin, destination, map]);

  // Get current location using geolocation
  const handleGetCurrentLocation = useCallback(() => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Got current position:', position);
          const { latitude, longitude } = position.coords;
          const currentPos = { lat: latitude, lng: longitude };
          setCurrentLocation(currentPos);
          setClickedLocation(currentPos);

          const geocoder = L.Control.Geocoder.nominatim({
            geocodingQueryParams: { countrycodes: 'vn' }
          });

          geocoder.reverse(currentPos, map?.getZoom() || 13, (results) => {
            if (results.length > 0) {
              console.log('Current location address:', results[0]);
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
  }, [map]);


  useEffect(() => {
    handleGetCurrentLocation(); // Gọi hàm lấy vị trí hiện tại khi trang load
  }, []);
  
  // Cập nhật origin khi có currentLocation
  useEffect(() => {
    console.log('Current location updated:', currentLocation);
    if (currentLocation && origin === null) {
      setOrigin(currentLocation);  // Cập nhật origin bằng currentLocation lần đầu
    }
    handleSearch(); // Gọi hàm tìm đường khi có origin và destination
  }, [currentLocation, origin]);
  // Set map view when destination changes
  useEffect(() => {
    if (destination && map) {
      console.log('Setting initial destination view');
      const geocoder = L.Control.Geocoder.nominatim({
        geocodingQueryParams: { countrycodes: 'vn' }
      });

      geocoder.geocode(destination, (results) => {
        if (results.length > 0) {
          console.log('Initial destination coordinates:', results[0].center);
          const { lat, lng } = results[0].center;
          map.setView([lat, lng], 13);
        }
      });
    }
  }, [destination, map]);

  console.log('MapPage render state:', {
    origin,
    destination,
    isRouteVisible,
    currentLocation,
    clickedLocation,
    hasMap: !!map
  });

  // Memoize SearchBox and MapContainer to prevent unnecessary renders
  const memoizedSearchBox = useMemo(() => (
    <SearchBox
      origin={origin|| currentLocation}
      setOrigin={setOrigin}
      destination={destination}
      setDestination={setDestination}
      onSearch={handleSearch}
      isLoading={isLoading}
      onGetCurrentLocation={handleGetCurrentLocation}
      playgroundName={playgroundName}
      playgroundId={location.state?.playgroundId}
    />
  ), [origin, destination, isLoading, handleSearch, handleGetCurrentLocation, playgroundName]);

  const memoizedMapContainer = useMemo(() => (
    <div className="absolute inset-0" style={{ zIndex: 1 }}>
      <MapContainer
        origin={currentLocation || origin}
        destination={destination}
        isRouteVisible={isRouteVisible}
        onRouteCalculated={(routeData) => {
          console.log('Route calculated:', routeData);
          setRouteInfo(routeData);
        }}
        onMapClick={handleMapClick}
        onMapLoad={(mapInstance) => {
          console.log('Map loaded');
          setMap(mapInstance);
        }}
        clickedLocation={clickedLocation}
      />
    </div>
  ), [currentLocation, origin, destination, isRouteVisible, clickedLocation, handleMapClick]);

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 128px)', marginTop: '64px' }}>
      <div className="relative flex-1">
        {memoizedSearchBox}
        {memoizedMapContainer}
        <AnimatePresence>
          {isRouteVisible && routeInfo && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-6 right-16 bg-white rounded-xl shadow-lg p-4"
              style={{ zIndex: 999 }}
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

        {/* Loading overlay */}
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
  );
};

export default MapPage;