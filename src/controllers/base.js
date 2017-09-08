import Dom from './../utils/dom';
import getGridItems from './../templates/get-grid-items';
import {
  SEARCH_FORM_CLASS,
  SEARCH_FORM_CLASS_HIDDEN,
  SEARCH_INPUT_CLASS,
  SEARCH_RESULTS_ID,
  RESULT_LOAD_MORE_CLASS,
  RESULT_LOAD_MORE_CLASS_HIDDEN,
  RESULT_EMPTY_CLASS,
  RESULT_EMPTY_CLASS_HIDDEN,
  RESULT_LOADING_CLASS,
  RESULT_LOADING_CLASS_HIDDEN,
  ICON_FAVORITE_CLASS,
 } from './../constants/dom-selector';

import FavoriteStore from './../stores/favorites';

export default class BaseCtrl {

  constructor() {
    this._lastQuery = '';
  }

  async search(query) {
    return Promise.resolve();
  }

  async loadMore() {
    return Promise.resolve();
  }

  unMount() {
    // This is so dirty !!
    document.body.removeEventListener('click', this.toggleFavorites, false);
  }

  render() {
    // This is so dirty !!
    document.body.addEventListener('click', this.toggleFavorites);
  }


  toggleFavorites(e) {
    console.log('toggleFavorites', e.target) //e.target.dataset.columns

    if (Dom.hasClass(e.target, ICON_FAVORITE_CLASS)) {
       const item = JSON.parse(e.target.dataset.object);
       FavoriteStore.getInstance().addOrRemove(item);
    }
  }
}
