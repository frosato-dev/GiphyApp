import React, { PureComponent } from 'react';
import './Gif.css';

export default class Gif extends PureComponent {

  render() {
    const { image, children } = this.props;
    return (
      <div className="grid__panel">
        <div className="grid__panel-content">
          <img
            alt="decorative"
            className="grid__panel-image"
            src={image}
          />
        </div>
        { children }
      </div>
    );
  }
}


