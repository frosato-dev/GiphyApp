import React, { PureComponent } from 'react';

export default class Loading extends PureComponent {

  render() {
    const { isLoading } = this.props;

    if(!isLoading)
      return false;

    return (
      <div className="results__loading">
        <p>Please wait while loading</p>
        <div className="results__loader"></div>
      </div>
    );
  }
}
