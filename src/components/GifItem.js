import React, { PureComponent } from 'react';
import GifActions from './GifAction';

export default class GifGrid extends PureComponent {

  render() {
    const { gif, isFavorite } = this.props;

    return (
      <div className="grid__panel" data-id={gif.id}>
        <div className="grid__panel-content">
          <img
            alt="todo"
            className="grid__panel-image"
            src={gif.images.downsized.url}
          />
        </div>
        <GifActions
          isFavorite={isFavorite}
          url={gif.bitly_url}
        />
      </div>
    );
  }
}


