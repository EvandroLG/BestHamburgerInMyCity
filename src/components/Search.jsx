import React, { Component } from 'react';
import { connect } from 'react-redux';

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

  _onSubmit = e => {
    e.preventDefault();

    this.geocode({
      address: this.state.address
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
    this.setState({
      address: e.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this._onSubmit}>
        <input
          placeholder="Search for..." 
          value={this.state.address}
          onChange={this._onChange}
        />

        <input type="submit" value="Ok!" />
      </form> 
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
