import React from 'react';
import './App.css';
import Map from './components/Map';
import InstallPrompt from './components/InstallPrompt';
import InstallButton from './components/InstallButton';
//---------------------------------
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <InstallPrompt />
      
      <header className="app-header">
        <div className="header-content">
          <div className="header-text">
            <h1><img src={logo} alt="Logo" className="app-logo" /> Campus Accessibility</h1>
            <p className="subtitle">Find accessible routes & track buses</p>
          </div>
          <InstallButton />
        </div>
      </header>
      
      <div className="map-container">
        <Map />
      </div>
    </div>
  );
}

export default App;