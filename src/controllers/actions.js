import Dom from './../utils/dom';
import Actions from './../actions';
import Clipboard from 'clipboard';

import {
  ICON_FAVORITE_CLASS,
  ICON_COPY_CLASS,
 } from './../constants/dom-selector';

import FavoriteStore from './../stores/favorites';

export default class ActionsCtrl {

  unMount() {
    // This is so dirty !!
    document.body.removeEventListener('click', this.toggleFavorites, false);
    if(this._clipboard) {
      this._clipboard.destroy();
    }
  }

  render() {
    // This is so dirty !!
    document.body.addEventListener('click', this.toggleFavorites);
    this._clipboard = new Clipboard(ICON_COPY_CLASS);
  }

  toggleFavorites(e) {
    if (Dom.hasClass(e.target, ICON_FAVORITE_CLASS)) {
       const item = JSON.parse(e.target.dataset.object);
       Actions.toggleFavorite(item);
    }
  }
}
