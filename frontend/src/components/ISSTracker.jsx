import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import socket from '../socket';

// ISS Tracker widget shows live position of the ISS on an interactive map
// and lets users request future overhead pass predictions.
const issIcon = L.icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
  iconSize: [32, 32],
});

function ISSTracker() {
  const [issPosition, setIssPosition] = useState([0, 0]);
  const [userLat, setUserLat] = useState('');
  const [userLon, setUserLon] = useState('');
  const [prediction, setPrediction] = useState('');

  useEffect(() => {
    const handleIssUpdate = ({ latitude, longitude }) => {
      setIssPosition([latitude, longitude]);
    };

    socket.on('iss-position', handleIssUpdate);
    return () => {
      socket.off('iss-position', handleIssUpdate);
    };
  }, []);

  const handlePredictPass = () => {
    // Placeholder: future implementation will use tle.js to predict next pass
    setPrediction(`Predicting pass for (${userLat}, ${userLon})... coming soon!`);
  };

  return (
    <div className="iss-tracker-widget">
      <h2>ISS Tracker</h2>
      <MapContainer center={issPosition} zoom={3} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker icon={issIcon} position={issPosition}>
          <Popup>International Space Station</Popup>
        </Marker>
      </MapContainer>
      <div className="user-location-inputs">
        <label>
          Latitude:
          <input
            type="number"
            value={userLat}
            onChange={(e) => setUserLat(e.target.value)}
          />
        </label>
        <label>
          Longitude:
          <input
            type="number"
            value={userLon}
            onChange={(e) => setUserLon(e.target.value)}
          />
        </label>
        <button onClick={handlePredictPass}>Predict Next Pass</button>
        {prediction && <p>{prediction}</p>}
      </div>
    </div>
  );
}

export default ISSTracker;
