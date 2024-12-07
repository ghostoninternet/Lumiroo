import React from 'react';
import { MapContainer as LeafletMapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import RoutingMachine from '../../pages/Map/RoutingMachine';

const MapContainer = ({ 
  origin, 
  destination, 
  isRouteVisible, 
  onMapClick,
  onMapLoad,
  clickedLocation 
}) => {
  const handleMapCreated = (map) => {
    // Explicitly remove the default zoom control
    if (map.zoomControl) {
      map.zoomControl.remove();
    }
    // Call the original onMapLoad prop
    onMapLoad?.(map);
  };

  return (
    <LeafletMapContainer
      center={[21.0285, 105.8542]}
      zoom={13}
      className="h-full w-full"
      style={{ height: '100%', width: '100%' }}
      whenCreated={handleMapCreated}
      onClick={onMapClick}
      zoomControl={false}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {origin && destination && isRouteVisible && (
        <RoutingMachine
          origin={origin}
          destination={destination}
          isRouteVisible={isRouteVisible}
        />
      )}
    </LeafletMapContainer>
  );
};

export default MapContainer;