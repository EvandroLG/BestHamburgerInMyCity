import React, { Component } from 'react';

export default class Map extends Component {
  state = {
    map: null
  }

  componentDidMount() {
    const { location } = this.props.place.geometry;

    const map = new google.maps.Map(this.refs.map, {
      zoom: 15,
      center: location
    });

    this._createMarker(map);
    this.setState({ map });
  }

  _setInfoWindow = (map, marker) => {
    const infoWindow = new google.maps.InfoWindow();

    infoWindow.setContent(this.props.place.name);
    infoWindow.open(map, marker);
  }

  _createMarker(map) {
    const marker = new google.maps.Marker({
      map,
      position: this.props.place.geometry.location,
      animation: google.maps.Animation.DROP,
    });

    this._setInfoWindow(map, marker);
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
