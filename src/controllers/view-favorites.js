import FavoriteStore from './../stores/favorites';
import Dom from './../utils/dom';
import ViewHelper from './../utils/view';

import {
  FAVORITE_FETCH_SUCCESS,
  FAVORITE_ADD_SUCCESS,
  FAVORITE_REMOVE_SUCCESS,
} from './../constants/actions';
import {
  SEARCH_RESULTS_ID,
 } from './../constants/dom-selector';

export default class FavoritesCtrl {

  unMount() {
    FavoriteStore.getInstance().unsubscribe(this._onStoreChange);
  }

  render() {
    FavoriteStore.getInstance().subscribe(this._onStoreChange);
    ViewHelper.hideSearchForm();
    this._onStoreChange(FAVORITE_FETCH_SUCCESS);
  }

  _onStoreChange(action) {
    switch (action) {
      case FAVORITE_REMOVE_SUCCESS:
      case FAVORITE_FETCH_SUCCESS: {
        const favorites = FavoriteStore.getInstance().favorites;
        const list = Object.values(favorites)
        ViewHelper.replaceList(list, favorites);
        if(!list.length){
          ViewHelper.showNoResults();
        } else {
          ViewHelper.hideNoResults()
        }
        break;
      }
    }
  }
}
