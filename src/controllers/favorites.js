import BaseCtrl from './base';
import Store from './../stores/favorites';
import Dom from './../utils/dom';

import {
  ADD as ACTION_ADD,
  REPLACE as ACTION_REPLACE,
} from './../constants/actions';
import {
  SEARCH_RESULTS_ID,
 } from './../constants/dom-selector';

export default class FavoritesCtrl extends BaseCtrl {

  constructor() {
    super();
  }

  async search(query) { /* do nothing for the moment */ }
  async loadMore()  { /* do nothing for the moment */ }

  unMount() {
    super.unMount();
  }

  render() {
    FavoritesCtrl.hideSearchForm();
    super.render();
    this._onStoreChange(ACTION_REPLACE);
  }

  _onStoreChange(action, data) {
    const list = Store.getInstance().favorites
    switch (action) {
      case ACTION_ADD:
        FavoritesCtrl.appendToList(list.slice(
          list.length - this._searchLimit,
          list.length
        ));
        break;
      case ACTION_REPLACE:
        FavoritesCtrl.replaceList(list);
        if(!list.length){
          FavoritesCtrl.showNoResults();
        } else {
          FavoritesCtrl.hideNoResults()
        }
        break;
    }
  }
}
