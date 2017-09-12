import React, { PureComponent } from 'react';

export default class GifGrid extends PureComponent {

  render() {
    const { gif, children } = this.props;
    console.log(gif)
    return (
      <div className="grid__panel">
        <div className="grid__panel-content">
          <img
            alt="decorative"
            className="grid__panel-image"
            src={gif.images.downsized.url}
          />
        </div>
        { children }
      </div>
    );
  }
}


