import React, { PureComponent } from 'react'

export default class Actions extends PureComponent {

  render() {
    return (
      <div className="grid__panel-action">
        {this.props.children}
      </div>
    );
  };
}
