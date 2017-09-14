import React, { PureComponent } from 'react';

export default class GidItem extends PureComponent {

  render() {
    const { children } = this.props;
    return (
      <div className="grid__panel">
        { children }
      </div>
    );
  }
}


