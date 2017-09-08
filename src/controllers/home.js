import BaseCtrl from './base';
import Store from './../stores/home';
import GiphyService from './../services/giphy';
import Dom from './../utils/dom';

import {
  ADD as ACTION_ADD,
  REPLACE as ACTION_REPLACE,
} from './../constants/actions';
import {
  SEARCH_RESULTS_ID,
 } from './../constants/dom-selector';

export default class HomeCtrl extends BaseCtrl {

  constructor() {
    super();
    this._service = GiphyService;
  }

  unMount() {
    super.unMount();
    Dom.get(SEARCH_RESULTS_ID).innerHTML = '';
  }

  render() {
    HomeCtrl.showSearchForm();
    super.render();
    this._onStoreChange(ACTION_REPLACE);
  }

  _onStoreChange(action) {
    const list = Store.getInstance().home
    switch (action) {
      case ACTION_ADD:
        HomeCtrl.appendToList(list.slice(
          list.length - this._searchLimit,
          list.length
        ));
        break;
      case ACTION_REPLACE:
        HomeCtrl.replaceList(list);
        if(!list.length && Store.getInstance().isDirty){
          HomeCtrl.showNoResults();
        } else {
          HomeCtrl.hideNoResults()
        }
        break;
    }
  }
}
