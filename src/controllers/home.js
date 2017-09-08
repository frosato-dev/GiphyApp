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

 import { SEARCH_LIMIT } from './../constants';

export default class HomeCtrl extends BaseCtrl {

  constructor(searchValue) {
    super();
    this._service = GiphyService;

    // Run initial search if needed
    if(
      !!searchValue &&
      searchValue !== ''
    ) {
      this.search(searchValue)
    }
  }

  unMount() {
    super.unMount();
    Dom.get(SEARCH_RESULTS_ID).innerHTML = '';
  }

  render() {
    HomeCtrl.showSearchForm();
    this._onStoreChange(ACTION_REPLACE);
    super.render();
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
        if(!list.length && Store.getInstance().isDirty){
          HomeCtrl.showNoResults();
        } else {
          HomeCtrl.hideNoResults()
        }
        break;
    }
  }
}
