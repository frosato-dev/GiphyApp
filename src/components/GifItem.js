import React, { PureComponent } from 'react';

export default class GifGrid extends PureComponent {

  render() {
    const { gif, isFavorite } = this.props;

    let favoriteClass = 'grid__panel-action-btn icon-btn icon-btn__favorite'
    favoriteClass += isFavorite ? ' icon-btn__favorite--active' : '';
    const favoriteText = isFavorite ? 'Remove from favorites' : 'Add to favorites';

    return (
      <div className="grid__panel" data-id={gif.id}>
        <div className="grid__panel-content">
          <img
            alt="todo"
            className="grid__panel-image"
            src={gif.images.downsized.url}
          />
        </div>
        <div className="grid__panel-action">
          <button
            alt={favoriteText}
            className={favoriteClass}
          />
          <button
            alt="Copy to clipboard"
            data-clipboard-text={gif.bitly_url}
            className="grid__panel-action-btn icon-btn icon-btn__copy"
          />
        </div>
      </div>
    );
  }
}


