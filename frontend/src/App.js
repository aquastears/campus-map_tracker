import React from 'react';
import './App.css';
import Map from './components/Map';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>🗺️ Campus Accessibility & Bus Tracker</h1>
        <p className="subtitle">Find accessible routes and track campus buses</p>
      </header>
      <div className="map-container">
        <Map />
      </div>
    </div>
  );
}

export default App;