import React, { Component } from 'react';
import Map from './Map';

import './Main.css';

export default class Main extends Component {
  state = {
    place: null,
    map: null
  }

  placesService = new google.maps.places.PlacesService(document.createElement('div'))

  _findTheBest = (results, status) => {
    if (status !== google.maps.places.PlacesServiceStatus.OK) { return; }

    const result = results.reduce((prev, current) => (prev.rating > current.rating) ? prev : current);
    const map = <Map place={result}  />;

    this.placesService.getDetails({
      placeId: result.place_id
    }, (place) => {
      console.log(place);
      this.setState({ place, map });
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

    this.placesService.nearbySearch(request, this._findTheBest);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this._searchByPlaces);
  }

  render() {
    const { place, map } = this.state;
    const result = place || {};

    return (
      <div>
        <h1>{result.name}</h1>
        <h2>{result.rating}</h2>

        <ul>
          <li><strong>Address: </strong>{result.formatted_address}</li>
          <li>
            <strong>Website: </strong>
            <a href={result.website} target="_blank">{result.website}</a>
          </li>
          <li>
            <strong>Phone: </strong>
            {result.formatted_phone_number}
          </li>
        </ul>

        {map}
      </div>
    )
  }
}
