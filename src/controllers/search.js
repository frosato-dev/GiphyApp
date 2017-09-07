import Dom from './../utils/dom';
import {
  SEARCH_FORM_CLASS,
  SEARCH_INPUT_CLASS,
  SEARCH_FORM_CLEAR_CLASS,
  SEARCH_FORM_CLEAR_CLASS_HIDDEN,
 } from './../constants/dom-selector';

const defaultSearchCallback = () => console.log('no callback set to SearchCtrl');

export default class SearchCtrl {

  constructor(searchValue, searchCallback = defaultSearchCallback) {

    // Get InputSearch Dom Element
    this._searchInput = Dom.get(SEARCH_INPUT_CLASS)[0];
    this._searchFrom = Dom.get(SEARCH_FORM_CLASS)[0];
    this._searchClear = Dom.get(SEARCH_FORM_CLEAR_CLASS)[0];

    this._searchInput.value = searchValue;
    this._searchCallback = searchCallback.search.bind(searchCallback); // @TODO check how to avoid this and bind before passing Ctrl as constructor arguments

    this.initListeners(searchCallback);

    // Run initial search if needed
    if(
      !!this._searchInput.value &&
      this._searchInput.value !== ''
    ) {
      Dom.show(SEARCH_FORM_CLEAR_CLASS, SEARCH_FORM_CLEAR_CLASS_HIDDEN);
      this._searchCallback(searchValue)
    }
  }

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

  setCallback(searchCallback) {
    this._searchCallback = searchCallback;
  }

  initListeners(searchCallback) {

    this._searchClear.addEventListener('click', (e) => {
      this._searchInput.value = '';
      Dom.hide(SEARCH_FORM_CLEAR_CLASS, SEARCH_FORM_CLEAR_CLASS_HIDDEN);
      this._setQueryInUrl('');
    });

    this._searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      if(!query.length) {
        Dom.hide(SEARCH_FORM_CLEAR_CLASS, SEARCH_FORM_CLEAR_CLASS_HIDDEN);
      } else {
        Dom.show(SEARCH_FORM_CLEAR_CLASS, SEARCH_FORM_CLEAR_CLASS_HIDDEN);
      }
    })

    this._searchFrom.onsubmit = (e) => {
      e.preventDefault();
      const query = this._searchInput.value;
      if(query.length) {
        this._setQueryInUrl(query);
        this._searchCallback(query)
      }
    }
  }
}
