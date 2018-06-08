import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from './Search';
import Map from './Map';
import Photos from './Photos';

import './Main.css';

class Main extends Component {
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
      this.setState({ place, map });
    });
  }

  _searchByPlaces = () => {
    const { latitude, longitude } = this.props.currentPosition;

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

  componentDidUpdate(prev) {
    if (prev.currentPosition.latitude && !Object.is(prev.currentPosition, this.props.currentPosition)) {
      this._searchByPlaces();
    }
  }

  componentDidMount() {
    this.props.getCurrentPosition(this._searchByPlaces);
  }

  render() {
    const { place, map } = this.state;
    const result = place || {};

    return (
      <div>
        <Search currentPosition={this.props.currentPosition} />

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

        <Photos photos={result.photos} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentPosition }) => {
  return {
    currentPosition
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentPosition: (callback) => {
      navigator.geolocation.getCurrentPosition(data => {
        const { latitude, longitude } = data.coords;
        const position = {
          latitude, longitude
        };

        dispatch({
          type: 'UPDATE_CURRENT_POSITION',
          position
        });

        callback();
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
