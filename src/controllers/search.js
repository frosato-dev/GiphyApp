import Dom from './../utils/dom';

const defaultSearchCallback = () => console.log('no callback set to SearchCtrl');

export default class SearchCtrl {

  constructor(searchValue, searchCallback = defaultSearchCallback) {

    // Get InputSearch Dom Element
    this._searchInput = Dom.get(".header__form-input")[0];

    this._searchInput.value = searchValue;
    this._searchCallback = searchCallback.search.bind(searchCallback);

    this.initListeners(searchCallback);

    // Run initial search if needed
    if(
      !!this._searchInput.value &&
      this._searchInput.value !== ''
    ) {
      this._searchCallback(searchValue)
    }
  }

  setCallback(searchCallback) {
    this._searchCallback = searchCallback;
  }

  initListeners(searchCallback) {
    this._searchInput.addEventListener('change', (e) => this._searchCallback(e.target.value));
  }
}
