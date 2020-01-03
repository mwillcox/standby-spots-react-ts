import React from 'react';
//import mapboxgl from 'mapbox-gl';

// type MyProps = {
//   data: object;
// };
// type MyState = {
//   lng: number,
//   lat: number,
//   zoom: number;
// };

// class Map extends React.Component<MyProps, MyState> {
//   constructor(props) {
//     super(props);
//     this.state = {
//       lng: 5,
//       lat: 34,
//       zoom: 2
//     };
//   }

//   componentDidMount(){
//     const map = new mapboxgl.Map({
//       container: this.mapContainer,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [this.state.lng, this.state.lat],
//       zoom: this.state.zoom
//       });
//   }

//   render() {
//     return (
//       <div ref={el => this.mapContainer = el} className="mapContainer" />
//     );
//   }
// }

const Map: React.FC = () => {
  return (
    <div>
      Map component
    </div>
  );
}

export default Map;