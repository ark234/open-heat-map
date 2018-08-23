import React from 'react';

const Station = props => {
  return (
    <div>
      <h1>Station: {props.i}</h1>
      <h3>Latitude: {props.lat}</h3>
      <h3>Longitude: {props.lon}</h3>
      <h3>Temperature: {props.temp}</h3>
    </div>
  );
};

export default Station;
