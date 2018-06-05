import React, { Component } from 'react';

export default class Photos extends Component {
  render() {
    return (this.props.photos || []).map(photo => {
      const src = photo.getUrl({ maxWidth: 100 });
      return <img src={src} />
    });
  }
}
