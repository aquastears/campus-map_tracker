import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function Map() {
  const [accessibilityPoints, setAccessibilityPoints] = useState([]);
  const [busStops, setBusStops] = useState([]);

  // Default center - Change these coordinates to your campus!
  // Current coords: Syracuse University
  const campusCenter = [43.0481, -76.1474];

  useEffect(() => {
    // Dummy data for testing - we'll connect to backend later
    setAccessibilityPoints([
      { 
        id: 1, 
        name: 'Accessible Entrance - Student Center', 
        latitude: 43.0481, 
        longitude: -76.1474, 
        type: 'entrance',
        description: 'Automatic door with ramp access'
      },
      { 
        id: 2, 
        name: 'Elevator - Science Building', 
        latitude: 43.0491, 
        longitude: -76.1484, 
        type: 'elevator',
        description: 'Main elevator, ground floor'
      },
      { 
        id: 3, 
        name: 'Accessible Ramp - Library', 
        latitude: 43.0471, 
        longitude: -76.1494, 
        type: 'ramp',
        description: 'Ramp access to main entrance'
      },
    ]);

    setBusStops([
      { 
        id: 1, 
        name: 'Main Campus Stop', 
        latitude: 43.0471, 
        longitude: -76.1464, 
        accessible: true,
        routes: ['Route 1', 'Route 3']
      },
      { 
        id: 2, 
        name: 'Engineering Quad', 
        latitude: 43.0501, 
        longitude: -76.1454, 
        accessible: true,
        routes: ['Route 2']
      },
    ]);
  }, []);

  return (
    <MapContainer 
      center={campusCenter} 
      zoom={15} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Accessibility Points */}
      {accessibilityPoints.map(point => (
        <Marker 
          key={`access-${point.id}`} 
          position={[point.latitude, point.longitude]}
        >
          <Popup>
            <div style={{ minWidth: '200px' }}>
              <strong>{point.name}</strong>
              <br />
              <em>Type: {point.type}</em>
              <br />
              {point.description}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Bus Stops */}
      {busStops.map(stop => (
        <Marker 
          key={`bus-${stop.id}`} 
          position={[stop.latitude, stop.longitude]}
        >
          <Popup>
            <div style={{ minWidth: '200px' }}>
              <strong>{stop.name}</strong>
              <br />
              <em>Accessible: {stop.accessible ? '✓ Yes' : '✗ No'}</em>
              <br />
              Routes: {stop.routes.join(', ')}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;