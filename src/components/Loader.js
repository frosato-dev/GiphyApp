import React, { PureComponent } from 'react';
import './Loader.css';

export default class Loading extends PureComponent {

  render() {
    return (
      <div className="loader-folding-cube">
        <div className="loader-cube1 loader-cube" />
        <div className="loader-cube2 loader-cube" />
        <div className="loader-cube4 loader-cube" />
        <div className="loader-cube3 loader-cube" />
      </div>
    );
  }
}
