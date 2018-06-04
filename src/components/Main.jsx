import React, { Component } from 'react';
import Map from './Map';

import './Main.css';

export default class Main extends Component {

  state = {
    bestResult: null,
    map: null
    //best: null,
    //otherrs: null,
    //map: null
  }

  //onClick = () => {
    //this.setState({
      //lat: 40.730610,
      //lng: -73.935242
    //}, () => {
      //const { map, lat, lng } = this.state;
      //map.setCenter(new google.maps.LatLng(lat, lng));
    //});
  //}

  //_renderMap() {
    //const { lat, lng } = this.state;

    //const map = new google.maps.Map(this.refs.map, {
      //zoom: 8,
      //center: {
        //lat,
        //lng
      //}
    //});

    //this.setState({
      //map
    //});

    //new google.maps.places.PlacesService(map).nearbySearch({
      //location: {
        //lat,
        //lng
      //},
      //radius: '50000',
      //keyword: 'hamburger'
    //}, (results, status) => {
      //console.log('status', status); 
      //console.log('results', results);
    //});
  //}

  _findTheBest = (results, status) => {
    if (status !== google.maps.places.PlacesServiceStatus.OK) { return; }

    const bestResult = results.reduce((prev, current) => (prev.rating > current.rating) ? prev : current);
    const { lat, lng } = bestResult.geometry.location;
    const map = <Map lat={lat()} lng={lng()} />
    
    this.setState({
      bestResult,
      map
    });
  }

  _searchByPlaces = (position) => {
    const { latitude, longitude } = position.coords;

    const request = {
      location: {
        lat: latitude,
        lng: longitude
      },

      rankBy: google.maps.places.RankBy.PROMINENCE,
      radius: '50000',
      keyword: 'hamburger'
    };

    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.nearbySearch(request, this._findTheBest);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this._searchByPlaces);
    //navigator.geolocation.getCurrentPosition((position) => {
      //const { latitude, longitude } = position.coords;
      //const map = <Map lat={latitude} lng={longitude} />

      //this.setState({
        //lat: latitude,
        //lng: longitude,
        //map
      //}); 
    //});
  }

  _renderMap() {
    return this.state.map; 
  }

  render() {
    return (
      <div>
        { this._renderMap() }
      </div>
    )
  }
}
