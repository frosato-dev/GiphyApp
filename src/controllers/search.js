import Dom from './../utils/dom';
import HomeStore from './../stores/home';
import GiphyService from './../services/giphy';
import ViewHelper from './../utils/view';

import {
  SEARCH_FORM_CLASS,
  SEARCH_INPUT_CLASS,
  SEARCH_FORM_CLEAR_CLASS,
 } from './../constants/dom-selector';

import { SEARCH_LIMIT } from './../constants';

export default class SearchCtrl {

  constructor(searchValue, controller) {

    // Get InputSearch Dom Element
    this._searchInput = Dom.get(SEARCH_INPUT_CLASS)[0];
    this._searchFrom = Dom.get(SEARCH_FORM_CLASS)[0];
    this._searchClear = Dom.get(SEARCH_FORM_CLEAR_CLASS)[0];

    this._searchInput.value = searchValue;
    this._lastQuery = '';

    this.initListeners();

    // Run initial search if needed
    if(
      !!this._searchInput.value &&
      this._searchInput.value !== ''
    ) {
      ViewHelper.showInputFormClear();
    }
  }

  async search(query) {
    ViewHelper.hideNoResults();
    ViewHelper.showLoading();
    this._lastQuery = query;
    const offset = 0;
    const res = await GiphyService.search(query, offset, SEARCH_LIMIT);
    HomeStore.getInstance().replace(res);
  }

  async loadMore() {
    ViewHelper.showLoading();
    const offset = HomeStore.getInstance().pagination.offset + SEARCH_LIMIT;
    const res = await GiphyService.search(this._lastQuery, offset, SEARCH_LIMIT);
    HomeStore.getInstance().add(res);
  }

  // @TODO move into router
  _setQueryInUrl(query) { // Side effect :(
    const url = new URL(window.location)

    // "w.history.pushState" avoid page reload on query change
    // "w.location.search = `q=${query}`;" triggers a reload
    let nextUrl = url.origin;
    if(query.length) {
      nextUrl += `?q=${query}`;
    }
    if( nextUrl != window.location){
      window.history.pushState({
        path:nextUrl},
        '',
        nextUrl
      );
    }
  }

  initListeners() {

    this._searchClear.addEventListener('click', (e) => {
      this._searchInput.value = '';
      ViewHelper.hideInputFormClear();
      this._setQueryInUrl('');
    });

    this._searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      if(!query.length) {
        ViewHelper.hideInputFormClear();
      } else {
        ViewHelper.showInputFormClear();
      }
    })

    this._searchFrom.onsubmit = (e) => {
      e.preventDefault();
      const query = this._searchInput.value;
      if(query.length) {
        this._setQueryInUrl(query);
        this.search(query)
      }
    }
  }
}
