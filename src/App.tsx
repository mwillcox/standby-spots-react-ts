import React from 'react';
import Map from './Map';
import './App.css';
// import data from './data/locations.json';

const App: React.FC = () => {
  return (
    <div className="App">
      Standby Spots
      <Map />
    </div>
  );
}

export default App;
