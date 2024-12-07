import React from 'react';
import { MapContainer as LeafletMapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import RoutingMachine from '../../pages/Map/RoutingMachine';
import PropTypes from 'prop-types';

const MapContainer = ({ 
  origin, 
  destination, 
  isRouteVisible, 
  onMapClick,
  onMapLoad,
  clickedLocation,
  onRouteCalculated 
}) => {
  const handleMapCreated = (map) => {
    if (map.zoomControl) {
      map.zoomControl.remove();
    }
    map.attributionControl.setPosition('bottomright');
    onMapLoad?.(map);

    const createButton = (label, container) => {
      var btn = L.DomUtil.create('button', '', container);
      btn.setAttribute('type', 'button');
      btn.innerHTML = label;
      return btn;
    };

    map.on('click', function(e) {
      var container = L.DomUtil.create('div'),
          startBtn = createButton('Start from this location', container),
          destBtn = createButton('Go to this location', container);

      L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
    });
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
      attributionControl={true}
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
          onRouteCalculated={onRouteCalculated}
        />
      )}
    </LeafletMapContainer>
  );
};

MapContainer.propTypes = {
  origin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  ]),
  destination: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  ]),
  isRouteVisible: PropTypes.bool,
  onMapClick: PropTypes.func,
  onMapLoad: PropTypes.func,
  clickedLocation: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }),
  onRouteCalculated: PropTypes.func
};

MapContainer.defaultProps = {
  isRouteVisible: false,
  onMapClick: () => {},
  onMapLoad: () => {},
  onRouteCalculated: () => {}
};

export default MapContainer;