import React, { Component } from 'react';

import './app.css';
import Station from './components/Station.jsx';
import MapContainer from './components/MapContainer.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { stations: null, location: null };

    this.getStationData = this.getStationData.bind(this);
  }

  getStationData(lat, lon) {
    fetch(`/api/heat/${lat}/${lon}`)
      .then(res => res.json())
      .then(stations => {
        // console.log('stations ===>', stations);
        this.setState({ stations });
      });
  }

  componentDidMount() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.setState({
          location: { latitude: pos.coords.latitude, longitude: pos.coords.longitude }
        });
        this.getStationData(pos.coords.latitude, pos.coords.longitude);
      });
    }
  }

  render() {
    // if (this.state.stations && this.state.location) {
    //   const stationz = this.state.stations.map((station, i) => (
    //     <Station
    //       key={i}
    //       i={i}
    //       lat={station.latitude}
    //       lon={station.longitude}
    //       temp={station.temperature}
    //     />
    //   ));
    //   return (
    //     <div>
    //       <h1>
    //         Your Location: ({this.state.location.latitude}, {this.state.location.longitude})
    //       </h1>
    //       {/* <div id="map" /> */}
    //       <MapContainer />
    //       {stationz}
    //     </div>
    //   );
    // }
    // return <h1>Loading Stations...</h1>;
    if (this.state.location && this.state.stations) {
      return (
        <MapContainer
          stations={this.state.stations}
          lat={this.state.location.latitude}
          lon={this.state.location.longitude}
        />
      );
    }
    return <h1>Loading...</h1>;
    // return <MapContainer />;
  }
}
