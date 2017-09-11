import HomeStore from './../stores/home';
import FavoriteStore from './../stores/favorites';
import SearchStore from './../stores/search';
import Dom from './../utils/dom';
import ViewHelper from './../utils/view';
import SearchCtrl from './../controllers/search';
import ActionsCtrl from './../controllers/actions';
import Actions from './../actions';

import {
  SEARCH_FETCH_NEXT_SUCCESS,
  SEARCH_FETCH_SUCCESS,
  SEARCH_FETCH_FAILED,
  FAVORITE_REMOVE_SUCCESS,
  FAVORITE_ADD_SUCCESS,
  SEARCH_IS_LOADING,
} from './../constants/actions';
import {
  SEARCH_RESULTS_ID,
  RESULT_LOAD_MORE_CLASS,
  RESULT_LOAD_MORE_CLASS_HIDDEN,
  SEARCH_INPUT_CLASS, // to change
 } from './../constants/dom-selector';

 import { SEARCH_LIMIT } from './../constants';

export default class HomeCtrl {

  constructor(searchValue) {
    this._stores = [ HomeStore, FavoriteStore, SearchStore ];
    this._searchCtlr = new SearchCtrl(searchValue);
    this._actionsCtlr = new ActionsCtrl();
  }

  unMount() {
    this._stores.map(store => store.getInstance().unsubscribe(this._onStoreChange));
    Dom.get(RESULT_LOAD_MORE_CLASS)[0].removeEventListener('click', Actions.loadMore);
    ViewHelper.clearResultGrid();
    ViewHelper.hideResultText();
    this._searchCtlr.unMount();
    this._actionsCtlr.unMount();
  }

  render() {
    this._stores.map(store => store.getInstance().subscribe(this._onStoreChange));
    Dom.get(RESULT_LOAD_MORE_CLASS)[0].addEventListener('click', Actions.loadMore);
    this._onStoreChange(SEARCH_FETCH_SUCCESS);
    this._actionsCtlr.render();
    this._searchCtlr.render();
  }

  _onStoreChange(action) {
    switch (action) {
      case SEARCH_FETCH_NEXT_SUCCESS:{
        const list = HomeStore.getInstance().list;
        const pagination = SearchStore.getInstance().pagination;
        const favorites = FavoriteStore.getInstance().favorites;

        ViewHelper.appendToList(list.slice(
          list.length - SEARCH_LIMIT,
          list.length
        ), favorites);
        ViewHelper.toggleLoadMore(SearchStore.getInstance().canLoadMore());
        ViewHelper.setResultText(list.length, pagination.total_count)
        ViewHelper.showResultText();
        break;
      }
      case FAVORITE_REMOVE_SUCCESS: // Move to a function that get the dom element and update it
      case FAVORITE_ADD_SUCCESS: // same as above
      case SEARCH_FETCH_SUCCESS: {

        const list = HomeStore.getInstance().list;
        const favorites = FavoriteStore.getInstance().favorites;

        ViewHelper.replaceList(list, favorites);
        ViewHelper.toggleLoadMore(SearchStore.getInstance().canLoadMore());

        if(!list.length && SearchStore.getInstance().isDirty){
          ViewHelper.showNoResults();
          ViewHelper.hideResultText();
        } else {
          ViewHelper.hideNoResults();
        }

        if(list.length){
          const total = SearchStore.getInstance().pagination.total_count
          ViewHelper.setResultText(list.length, total);
          ViewHelper.showResultText();
        }
        break;
      }
      case SEARCH_IS_LOADING: {
        ViewHelper.hideNoResults();
        ViewHelper.showLoading();
      }
    }
  }
}
