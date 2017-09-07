import Store from './../stores/home';
import GiphyService from './../services/giphy';
import Dom from './../utils/dom';
import getGridItems from './../templates/get-grid-items';
import {
  ADD as ACTION_ADD,
  REPLACE as ACTION_REPLACE,
  REMOVE as ACTION_REMOVE,
} from './../constants/actions';
import {
  SEARCH_INPUT_CLASS,
  SEARCH_RESULTS_ID,
  RESULT_LOAD_MORE_CLASS,
  RESULT_LOAD_MORE_CLASS_HIDDEN,
  RESULT_EMPTY_CLASS,
  RESULT_EMPTY_CLASS_HIDDEN,
 } from './../constants/dom-selector';

const SEARCH_LIMIT = 25 // 25 is the API default value is none provided anyway

export default class HomeCtrl {

  constructor() {
    this._lastQuery = '';
    Dom.get(RESULT_LOAD_MORE_CLASS)[0].addEventListener('click', () => this.loadMore());
  }

  async search(query) {
    this._lastQuery = query;
    const offset = 0;
    const res = await GiphyService.search(query, offset, SEARCH_LIMIT);
    Store.getInstance().replace(res);
  }

  async loadMore() {
    const offset = Store.getInstance().pagination.offset + SEARCH_LIMIT; //Store.getInstance().home.length;
    const res = await GiphyService.search(this._lastQuery, offset, SEARCH_LIMIT);
    Store.getInstance().add(res);
  }

  unMount() {
    Store.getInstance().unsubscribe(this._onStoreChange);
  }

  render() {
    Store.getInstance().subscribe(this._onStoreChange);
  }

  _onStoreChange(action) {
    const list = Store.getInstance().home;
    switch (action) {
      case ACTION_ADD:
        HomeCtrl.appendToList(list.slice(
          list.length - SEARCH_LIMIT,
          list.length
        ));
        break;
      case ACTION_REPLACE:
        HomeCtrl.replaceList(list);
        if(!list.length){
          HomeCtrl.showNoResults();
        } else {
          HomeCtrl.hideNoResults()
        }
        break;
      case ACTION_FAVORITES_REMOVE:

        break;
      case ACTION_FAVORITES_REMOVE:

        break;
    }
  }

  //
  // DOM MANIPULATION METHODS
  // static to avoid context issue with 'this' - @TODO understand 'this'
  //
  //
  static showNoResults() {
    Dom.show(RESULT_EMPTY_CLASS, RESULT_EMPTY_CLASS_HIDDEN);
  }
  static hideNoResults() {
    Dom.hide(RESULT_EMPTY_CLASS, RESULT_EMPTY_CLASS_HIDDEN);
  }

  static hideOrShowLoadMore() {
    if(Store.getInstance().canLoadMore()) {
      Dom.show(RESULT_LOAD_MORE_CLASS, RESULT_LOAD_MORE_CLASS_HIDDEN)
    } else {
      Dom.hide(RESULT_LOAD_MORE_CLASS, RESULT_LOAD_MORE_CLASS_HIDDEN)
    }
  }

  static appendToList(data) {
    const html = getGridItems(data);
    Dom.get(SEARCH_RESULTS_ID)
      .insertAdjacentHTML('beforeend', html);
    HomeCtrl.hideOrShowLoadMore();
  }

  static replaceList(data) {
    const html = getGridItems(data);
    Dom.get(SEARCH_RESULTS_ID).innerHTML = html;
    HomeCtrl.hideOrShowLoadMore();
  }
}
