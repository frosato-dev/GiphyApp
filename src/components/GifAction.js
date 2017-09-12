import React, { PureComponent } from 'react';

export default class GridActions extends PureComponent {
  render() {
    const { url, isFavorite } = this.props;
    let favoriteClass = 'grid__panel-action-btn icon-btn icon-btn__favorite'
    favoriteClass += isFavorite ? ' icon-btn__favorite--active' : '';
    const favoriteText = isFavorite ? 'Remove from favorites' : 'Add to favorites';
    return (
      <div className="grid__panel-action">
        <button
          alt={favoriteText}
          className={favoriteClass}
        />
        <button
          alt="Copy to clipboard"
          data-clipboard-text={url}
          className="grid__panel-action-btn icon-btn icon-btn__copy"
        />
      </div>
    );
  }
}
