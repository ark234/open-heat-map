import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { foo: null };
  }

  componentDidMount() {
    fetch('/api/getFoo')
      .then(res => res.json())
      .then(data => this.setState(data));
  }

  render() {
    return (
      <div>{this.state.foo ? <h1>Fooooo: {this.state.foo}</h1> : <h1>Loading Foo...</h1>}</div>
    );
  }
}
