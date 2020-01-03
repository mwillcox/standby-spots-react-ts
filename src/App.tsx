import React from 'react';
import data from './data/locations.json'

const App: React.FC = () => {
  let d = data;
  d.forEach(item => console.log(item.name))
  console.log(d)
  return (
    <div className="App">
      Standby Spots
      { d.map((item) => (
        <p>{item.name}</p>
      )) }
    </div>
  );
}

export default App;
