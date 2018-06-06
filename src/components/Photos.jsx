import React, { Component } from 'react';

export default class Photos extends Component {
  _renderPhotos() {
    return (this.props.photos || []).slice(0, 5).map((photo, id) => {
      const src = photo.getUrl({ maxWidth: 200, maxHeight: 200 });
      return <li key={id}><img src={src} /></li>
    });
  }

  render() {
    return (
      <ul>
        { this._renderPhotos() }
      </ul>
    )
  }
}
