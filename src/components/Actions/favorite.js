import React, { PureComponent } from 'react'

export default class ActionFavorite extends PureComponent {

  render() {
    const { isFavorite, action } = this.props;
    let favoriteClass = 'grid__panel-action-btn icon-btn icon-btn__favorite'
    favoriteClass += isFavorite ? ' icon-btn__favorite--active' : '';

    return (
      <button
        onClick={action}
        alt="Copy to clipboard"
        className={favoriteClass}
      />
    );
  };
}
