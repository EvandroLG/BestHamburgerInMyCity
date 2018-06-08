import React, { Component } from 'react';
import { connect } from 'react-redux';

function debounce(callback, wait, context = this) {
  let timeout = null;
  let callbackArgs = null;

  const later = () => callback.apply(context, callbackArgs);

  return function() {
    callbackArgs = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

class Search extends Component {
  state = {
    address: '',
    currentPosition: null
  }

  geocode = new google.maps.Geocoder().geocode

  shouldComponentUpdate(nextProps, nextState) {
    if (!Object.is(nextState, this.state)) {
      return true;
    }

    if (Object.is(nextProps.currentPosition, this.props.currentPosition) ||
       Object.is(this.state.currentPosition, nextProps.currentPosition)) {
      return false;
    }

    const { currentPosition } = nextProps;

    const location = {
      lat: currentPosition.latitude,
      lng: currentPosition.longitude
    };

    this.geocode({
      location
    }, data => {
      this.setState({
        address: data[0].formatted_address
      });
    });

    return true;
  }

  _updateGeoPosition = address => {
    this.geocode({
      address
    }, (data) => {
      if (!data) { return; }

      const { lat, lng } = data[0].geometry.location;

      const currentPosition = {
        latitude: lat(),
        longitude: lng()
      };

      this.setState({
        currentPosition
      }, () => {
        this.props.updateCurrentPosition(currentPosition);
      });
    });
  }

  _onChange = e => {
    const address = e.target.value;

    this.setState({
      address: address
    });

    debounce(() => this._updateGeoPosition(address), 2000)();
  }

  render() {
    return (
      <input
        placeholder="Search for..." 
        value={this.state.address}
        onChange={this._onChange}
      />
    )
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentPosition: position => {
      dispatch({
        type: 'UPDATE_CURRENT_POSITION',
        position
      })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
