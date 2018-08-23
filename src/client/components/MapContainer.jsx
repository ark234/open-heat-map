import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div className="markers">{text}</div>;

export default class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Stations = this.props.stations.map(station => (
      <AnyReactComponent
        lat={station.latitude}
        lng={station.longitude}
        text={station.temperature}
      />
    ));
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCS7g0n8mOkoQiW_JhKJlErjr_-QGrNG98' }}
          center={[this.props.lat, this.props.lon]}
          zoom={11}>
          <AnyReactComponent lat={this.props.lat} lng={this.props.lon} text={'\u003E'} />
          {Stations}
        </GoogleMapReact>
      </div>
    );
  }
}
