import Dom from './../utils/dom';
import ViewHelper from './../utils/view';
import Actions from './../actions';
import { setQueryInUrl } from './../utils/router';

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

    this.initListeners();

    // Run initial search if needed
    if(
      !!this._searchInput.value &&
      this._searchInput.value !== ''
    ) {
      Actions.search(searchValue);
      ViewHelper.showInputFormClear();
    }
  }

  render() {
    ViewHelper.showSearchForm();
  }

  unMount() {
    ViewHelper.hideSearchForm();
  }

  initListeners() {

    this._searchClear.addEventListener('click', (e) => {
      this._searchInput.value = '';
      ViewHelper.hideInputFormClear();
      setQueryInUrl('');
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
        setQueryInUrl(query);
        Actions.search(query)
      }
    }
  }
}
