import Store from './../stores/home';
import Dom from './../utils/dom';
import getGridItems from './../templates/get-grid-items';
import {
  ADD as ACTION_ADD,
  REPLACE as ACTION_REPLACE,
} from './../constants/actions';
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
 } from './../constants/dom-selector';

const SEARCH_LIMIT = 25

export default class BaseCtrl {

  constructor() {
    this._searchLimit = SEARCH_LIMIT;
    this._lastQuery = '';
    this._service = () => ({
      search: () => false,
    });
  }

  async search(query) {
    BaseCtrl.hideNoResults();
    BaseCtrl.showLoading();
    this._lastQuery = query;
    const offset = 0;
    const res = await this._service.search(query, offset, SEARCH_LIMIT);
    Store.getInstance().replace(res);
  }

  async loadMore() {
    BaseCtrl.showLoading();
    const offset = Store.getInstance().pagination.offset + SEARCH_LIMIT; //Store.getInstance().home.length;
    const res = await this._service.search(this._lastQuery, offset, SEARCH_LIMIT);
    Store.getInstance().add(res);
  }

  unMount() {
    Store.getInstance().unsubscribe(this._onStoreChange);
    Dom.get(RESULT_LOAD_MORE_CLASS)[0].removeEventListener('click', () => this.loadMore());
  }

  render() {
    Store.getInstance().subscribe(this._onStoreChange);
    Dom.get(RESULT_LOAD_MORE_CLASS)[0].addEventListener('click', () => this.loadMore());
  }

  _onStoreChange(action, data) {
    const list = data
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
  static showLoading() {
    Dom.show(RESULT_LOADING_CLASS, RESULT_LOADING_CLASS_HIDDEN);
  }
  static hideLoading() {
    Dom.hide(RESULT_LOADING_CLASS, RESULT_LOADING_CLASS_HIDDEN);
  }
  static showSearchForm() {
    Dom.show(SEARCH_FORM_CLASS, SEARCH_FORM_CLASS_HIDDEN);
  }
  static hideSearchForm() {
    Dom.hide(SEARCH_FORM_CLASS, SEARCH_FORM_CLASS_HIDDEN);
  }

  static toggleLoadMore() {
    if(Store.getInstance().canLoadMore()) {
      Dom.show(RESULT_LOAD_MORE_CLASS, RESULT_LOAD_MORE_CLASS_HIDDEN)
    } else {
      Dom.hide(RESULT_LOAD_MORE_CLASS, RESULT_LOAD_MORE_CLASS_HIDDEN)
    }
  }

  static appendToList(data) {
    BaseCtrl.hideLoading();
    const html = getGridItems(data);
    Dom.get(SEARCH_RESULTS_ID)
      .insertAdjacentHTML('beforeend', html);
    BaseCtrl.toggleLoadMore();
  }

  static replaceList(data) {
    BaseCtrl.hideLoading();
    const html = getGridItems(data);
    Dom.get(SEARCH_RESULTS_ID).innerHTML = html;
    BaseCtrl.toggleLoadMore();
  }
}
