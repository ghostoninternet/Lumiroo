import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';
import PropTypes from 'prop-types';

const RoutingMachine = ({ origin, destination, isRouteVisible, onRouteCalculated }) => {
  const map = useMap();
  
  useEffect(() => {
    console.log('RoutingMachine mounted/updated:', {
      origin,
      destination,
      isRouteVisible
    });

    if (!map || !origin || !destination || !isRouteVisible) {
      console.log('Missing required props:', { 
        hasMap: !!map, 
        hasOrigin: !!origin, 
        hasDestination: !!destination, 
        isRouteVisible 
      });
      return;
    }

    let routingControl = null;
    let markers = [];

    const clearMarkers = () => {
      markers.forEach(marker => map.removeLayer(marker));
      markers = [];
    };

    const addMarker = (latLng, isStart = true) => {
      const marker = L.marker(latLng, {
        icon: L.divIcon({
          className: 'custom-marker',
          html: `<div class="w-4 h-4 ${isStart ? 'bg-blue-500' : 'bg-green-500'} rounded-full border-2 border-white shadow-lg"></div>`,
          iconSize: [16, 16]
        })
      });
      markers.push(marker);
      marker.addTo(map);
      return marker;
    };

    const geocodeAddress = async (address) => {
      const geocoder = L.Control.Geocoder.nominatim({
        geocodingQueryParams: {
          countrycodes: 'vn',
          format: 'json',
          addressdetails: 1,
          'accept-language': 'vi'
        }
      });

      return new Promise((resolve) => {
        geocoder.geocode(address, results => {
          console.log('Geocoding results for:', address, results);
          if (results?.length > 0) {
            resolve(results[0].center);
          } else {
            console.error('No results found for address:', address);
            resolve(null);
          }
        });
      });
    };

    const setupRoute = async () => {
      clearMarkers();
      
      let startPoint, endPoint;

      // Handle origin
      if (typeof origin === 'string') {
        const originCoords = await geocodeAddress(origin);
        if (!originCoords) return;
        startPoint = originCoords;
        addMarker([startPoint.lat, startPoint.lng], true);
      } else {
        startPoint = origin;
        addMarker([origin.lat, origin.lng], true);
      }

      // Handle destination
      const destCoords = await geocodeAddress(destination);
      if (!destCoords) return;
      endPoint = destCoords;
      addMarker([endPoint.lat, endPoint.lng], false);

      // Create routing control
      if (routingControl) {
        map.removeControl(routingControl);
      }

      routingControl = L.Routing.control({
        waypoints: [
          L.latLng(startPoint.lat, startPoint.lng),
          L.latLng(endPoint.lat, endPoint.lng)
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        language: 'vi', // Use Vietnamese language
        lineOptions: {
          styles: [
            { color: '#22c55e', opacity: 0.8, weight: 6 }
          ]
        },
        router: L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1',
          language: 'vi'
        }),
        createMarker: () => null // Disable default markers
      }).addTo(map);

      routingControl.on('routesfound', (e) => {
        const routes = e.routes;
        const summary = routes[0].summary;
        
        // Convert distance to km and time to minutes
        const distance = Math.round(summary.totalDistance / 100) / 10;
        const minutes = Math.round(summary.totalTime / 60);
        
        onRouteCalculated({
          distance: `${distance} km`,
          duration: `${minutes} 分`
        });

        // Fit bounds to show the entire route
        const bounds = L.latLngBounds([
          [startPoint.lat, startPoint.lng],
          [endPoint.lat, endPoint.lng]
        ]);
        map.fitBounds(bounds, { padding: [50, 50] });
      });
    };

    setupRoute();

    return () => {
      clearMarkers();
      if (routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, origin, destination, isRouteVisible, onRouteCalculated]);

  return null;
};

RoutingMachine.propTypes = {
  origin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    })
  ]).isRequired,
  destination: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    })
  ]).isRequired,
  isRouteVisible: PropTypes.bool.isRequired,
  onRouteCalculated: PropTypes.func
};

RoutingMachine.defaultProps = {
  onRouteCalculated: () => {}
};

export default RoutingMachine;