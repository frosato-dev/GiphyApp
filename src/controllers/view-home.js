import HomeStore from './../stores/home';
import FavoriteStore from './../stores/favorites';
import GiphyService from './../services/giphy';
import Dom from './../utils/dom';
import ViewHelper from './../utils/view';
import SearchCtrl from './../controllers/search';

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
  SEARCH_INPUT_CLASS, // to change
 } from './../constants/dom-selector';

 import { SEARCH_LIMIT } from './../constants';

export default class HomeCtrl {

  constructor(searchValue) {
    this._lastQuery = '';
    this._service = GiphyService;
    this._stores = [ HomeStore, FavoriteStore ];

    this._searchCtlr = new SearchCtrl(searchValue);

    if( // Run initial search if needed
      !!searchValue &&
      searchValue !== ''
    ) {
      this._searchCtlr.search(searchValue);
    }
  }

  unMount() {
    HomeStore.getInstance().subscribe(this._onStoreChange);
    FavoriteStore.getInstance().subscribe(this._onStoreChange);
    Dom.get(RESULT_LOAD_MORE_CLASS)[0].removeEventListener('click', () => this._searchCtlr.loadMore());
    ViewHelper.clearResultGrid();
    ViewHelper.hideResultText();
  }

  render() {
    HomeStore.getInstance().subscribe(this._onStoreChange);
    FavoriteStore.getInstance().subscribe(this._onStoreChange);
    ViewHelper.showSearchForm();
    Dom.get(RESULT_LOAD_MORE_CLASS)[0].addEventListener('click', () => this._searchCtlr.loadMore());
    this._onStoreChange(SEARCH_FETCH_SUCCESS);
  }

  _onStoreChange(action) {
    switch (action) {
      case SEARCH_FETCH_NEXT_SUCCESS:{
        const list = HomeStore.getInstance().home;
        const pagination = HomeStore.getInstance().pagination;
        const favorites = FavoriteStore.getInstance().favorites;

        ViewHelper.appendToList(list.slice(
          list.length - SEARCH_LIMIT,
          list.length
        ), favorites);
        ViewHelper.toggleLoadMore(HomeStore.getInstance().canLoadMore());
        ViewHelper.setResultText(list.length, pagination.total_count)
        ViewHelper.showResultText();
        break;
      }
      case FAVORITE_REMOVE_SUCCESS: // Move to a function that get the dom element and update it
      case FAVORITE_ADD_SUCCESS: // same as above
      case SEARCH_FETCH_SUCCESS: {
        const list = HomeStore.getInstance().home;
        const favorites = FavoriteStore.getInstance().favorites;

        ViewHelper.replaceList(list, favorites);
        ViewHelper.toggleLoadMore(HomeStore.getInstance().canLoadMore());

        if(!list.length && HomeStore.getInstance().isDirty){
          ViewHelper.showNoResults();
        } else {
          ViewHelper.hideNoResults();
        }

        if(list.length){
          const total = HomeStore.getInstance().pagination.total_count
          ViewHelper.setResultText(list.length, total);
          ViewHelper.showResultText();
        }
        break;
      }
    }
  }
}
