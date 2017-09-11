import FavoriteStore from './../stores/favorites';
import ActionsCtrl from './../controllers/actions';
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

  constructor(searchValue) {
    this._stores = [ FavoriteStore ];
    this._actionsCtrl = new ActionsCtrl();
  }

  unMount() {
    this._stores.map(store => store.getInstance().unsubscribe(this._onStoreChange));
    this._actionsCtrl.unMount();
  }

  render() {
    this._stores.map(store => store.getInstance().subscribe(this._onStoreChange));
    this._actionsCtrl.render();
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
