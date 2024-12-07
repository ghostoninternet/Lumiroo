import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';

const RoutingMachine = ({ origin, destination, isRouteVisible }) => {
  const map = useMap();

  
  useEffect(() => {
    console.log('RoutingMachine props:', { origin, destination, isRouteVisible });
  console.log('Map instance:', map);

        if (!map || !origin || !destination || !isRouteVisible) {
          console.log('Missing required props:', { 
            hasMap: !!map, 
            hasOrigin: !!origin, 
            hasDestination: !!destination, 
            isRouteVisible 
          });
          return;
        }

    if (!map || !origin || !destination || !isRouteVisible) return;

    const routingControl = L.Routing.control({
      waypoints: [
        typeof origin === 'string' 
          ? L.latLng(0, 0)
          : L.latLng(origin.lat, origin.lng),
        L.latLng(0, 0)
      ],
      routeWhileDragging: false,
      geocoder: L.Control.Geocoder.nominatim(),
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      lineOptions: {
        styles: [
          { color: '#22c55e', opacity: 0.8, weight: 6 }
        ],
        extendToWaypoints: false,
        missingRouteTolerance: 0
      },
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        language: 'ja'
      }),
      createMarker: function(i, waypoint, n) {
        const marker = L.marker(waypoint.latLng, {
          icon: L.divIcon({
            className: 'custom-marker',
            html: `<div class="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>`,
            iconSize: [16, 16]
          })
        });
        return marker;
      }
    }).addTo(map);

    routingControl.on('routesfound', function(e) {
      const routes = e.routes;
      const summary = routes[0].summary;
      // You can access distance and time here
      console.log(summary);
    });

    const updateWaypoints = async () => {
      try {
        const geocoder = L.Control.Geocoder.nominatim();
        
        if (typeof origin === 'string') {
          await new Promise((resolve) => {
            geocoder.geocode(origin, (results) => {
              if (results?.length > 0) {
                const { lat, lng } = results[0].center;
                routingControl.spliceWaypoints(0, 1, L.latLng(lat, lng));
              }
              resolve();
            });
          });
        }

        await new Promise((resolve) => {
          geocoder.geocode(destination, (results) => {
            if (results?.length > 0) {
              const { lat, lng } = results[0].center;
              routingControl.spliceWaypoints(1, 1, L.latLng(lat, lng));
            }
            resolve();
          });
        });
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    };

    updateWaypoints();

    map.on('zoomend', function() {
      const customMarkers = document.querySelectorAll('.custom-marker');
      customMarkers.forEach(marker => {
        marker.style.transition = 'transform 0.3s ease';
        marker.style.transform = `scale(${1 / Math.pow(2, map.getZoom() - 13)})`;
      });
    });

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, origin, destination, isRouteVisible]);

  return null;
};

export default RoutingMachine;