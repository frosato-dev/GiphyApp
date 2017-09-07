import GiphyService from './../services/giphy';
import Dom from './../utils/dom';
import getGridItems from './../templates/get-grid-items';
import {
  SEARCH_INPUT_CLASS,
  SEARCH_RESULTS_ID
 } from './../constants/dom-selector';

const SEARCH_LIMIT = 10

export default class HomeCtrl {

  constructor(searchValue) {

    // Get InputSearch Dom Element
    this._searchInput = Dom.get(".header__form-input")[0];

    // Set DomElements' listeners
    this.initListeners();

    // Populate Input value
    this._searchInput.value = searchValue;

    // Run initial search if needed
    if(
      !!this._searchInput.value &&
      this._searchInput.value !== ''
    ) {
      this.search(searchValue);
    }
  }

  initListeners() {
    this._searchInput.addEventListener('input', (e) => this.search(e.target.value));
  }

  async search(query) {
    const offset = 0;
    const res = await GiphyService.search(query, offset, SEARCH_LIMIT);
    // update store ?
    this.appendToList(res.data);
  }

  async loadMore() {
    const lastQuery = ''; // use store
    const offset = SEARCH_LIMIT;
    const res = await GiphyService.search(lastQuery, offset, SEARCH_LIMIT);
    // update store ?
    this.appendToList(res.data);
  }

  // put this into a class that watch store change
  appendToList(data) {
    Dom.get(SEARCH_RESULTS_ID)
      .insertAdjacentHTML('beforeend', getGridItems(data));
  }

  // put this into a class that watch store change
  replaceList(data) {
    Dom.get(SEARCH_RESULTS_ID)
      .replaceWith(getGridItems(data));
  }

  unMount() {
    // Remove listeners
  }

}
