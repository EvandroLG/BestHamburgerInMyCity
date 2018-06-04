import React, { Component } from 'react';

export default class Map extends Component {

  state = {
    map: null
  }

  componentDidMount() {
    const { lat, lng } = this.props;

    const map = new google.maps.Map(this.refs.map, {
      zoom: 15,
      center: {
        lat,
        lng
      }
    });

    this.setState({
      map
    });
  }

  update() {
    const { lat, lng } = this.props;
    this.state.map.setCenter(new google.maps.LatLng(lat, lng));
  }

  render() {
    return (
      <div className="map" ref="map" />
    )
  }
}
