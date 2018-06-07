import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class Search extends Component {
  state = {
    address: ''
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!Object.is(nextState, this.state)) {
      return true;
    }

    if (Object.is(nextProps.currentPosition, this.props.currentPosition)) {
      return false;
    }

    const { currentPosition } = nextProps;

    const location = {
      lat: currentPosition.latitude,
      lng: currentPosition.longitude
    };

    new google.maps.Geocoder().geocode({
      location
    }, (data) => {
      this.setState({
        address: data[0].formatted_address
      });
    });

    return true;
  }

  onChange = (e) => {
    this.setState({
      address: e.target.value
    });
  }

  render() {
    return (
      <input
        placeholder="Search for..." 
        value={this.state.address}
        onChange={this.onChange}
      />
    )
  }
}
