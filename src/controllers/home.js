import HomeStore from './../stores/home';
import FavoriteStore from './../stores/favorites';
import BaseCtrl from './base';
import GiphyService from './../services/giphy';
import Dom from './../utils/dom';
import ViewHelper from './../utils/view';

import {
  SEARCH_FETCH_NEXT_SUCCESS,
  SEARCH_FETCH_SUCCESS,
  SEARCH_FETCH_FAILED,
  FAVORITE_REMOVE_SUCCESS,
  FAVORITE_ADD_SUCCESS
} from './../constants/actions';
import {
  SEARCH_RESULTS_ID,
  RESULT_LOAD_MORE_CLASS,
  RESULT_LOAD_MORE_CLASS_HIDDEN,
 } from './../constants/dom-selector';

 import { SEARCH_LIMIT } from './../constants';

export default class HomeCtrl extends BaseCtrl {

  constructor(searchValue) {
    super();
    this._service = GiphyService;
    this._stores = [ HomeStore, FavoriteStore ]

    if( // Run initial search if needed
      !!searchValue &&
      searchValue !== ''
    ) {
      this.search(searchValue)
    }
  }

  async search(query) {
    ViewHelper.hideNoResults();
    ViewHelper.showLoading();
    this._lastQuery = query;
    const offset = 0;
    const res = await this._service.search(query, offset, SEARCH_LIMIT);
    HomeStore.getInstance().replace(res);
  }

  async loadMore() {
    ViewHelper.showLoading();
    const offset = HomeStore.getInstance().pagination.offset + SEARCH_LIMIT;
    const res = await this._service.search(this._lastQuery, offset, SEARCH_LIMIT);
    HomeStore.getInstance().add(res);
  }

  unMount() {
    HomeStore.getInstance().subscribe(this._onStoreChange);
    FavoriteStore.getInstance().subscribe(this._onStoreChange);
    Dom.get(RESULT_LOAD_MORE_CLASS)[0].removeEventListener('click', () => this.loadMore());
    ViewHelper.clearResultGrid();
    super.unMount();
  }

  render() {
    HomeStore.getInstance().subscribe(this._onStoreChange);
    FavoriteStore.getInstance().subscribe(this._onStoreChange);
    ViewHelper.showSearchForm();
    Dom.get(RESULT_LOAD_MORE_CLASS)[0].addEventListener('click', () => this.loadMore());
    this._onStoreChange(SEARCH_FETCH_SUCCESS);
    super.render();
  }

  _onStoreChange(action) {
    switch (action) {
      case SEARCH_FETCH_NEXT_SUCCESS:{
        const list = HomeStore.getInstance().home;
        const favorites = FavoriteStore.getInstance().favorites;

        ViewHelper.appendToList(list.slice(
          list.length - SEARCH_LIMIT,
          list.length
        ), favorites);
        ViewHelper.toggleLoadMore();
        break;
      }
      case FAVORITE_REMOVE_SUCCESS: // Move to a function that get the dom element and update it
      case FAVORITE_ADD_SUCCESS: // same as above
      case SEARCH_FETCH_SUCCESS: {
        const list = HomeStore.getInstance().home;
        const favorites = FavoriteStore.getInstance().favorites;

        ViewHelper.replaceList(list, favorites);

        if(HomeStore.getInstance().canLoadMore()) {
          Dom.show(RESULT_LOAD_MORE_CLASS, RESULT_LOAD_MORE_CLASS_HIDDEN)
        } else {
          Dom.hide(RESULT_LOAD_MORE_CLASS, RESULT_LOAD_MORE_CLASS_HIDDEN)
        }

        if(!list.length && HomeStore.getInstance().isDirty){
          ViewHelper.showNoResults();
        } else {
          ViewHelper.hideNoResults()
        }
        break;
      }
    }
  }
}
