import Dom from './../utils/dom';
import Actions from './../actions';

import {
  ICON_FAVORITE_CLASS,
 } from './../constants/dom-selector';

import FavoriteStore from './../stores/favorites';

export default class FavoriteCtrl {

  unMount() {
    // This is so dirty !!
    document.body.removeEventListener('click', this.toggleFavorites, false);
  }

  render() {
    // This is so dirty !!
    document.body.addEventListener('click', this.toggleFavorites);
  }

  toggleFavorites(e) {
    if (Dom.hasClass(e.target, ICON_FAVORITE_CLASS)) {
       const item = JSON.parse(e.target.dataset.object);
       Actions.toggleFavorite(item);
    }
  }
}
