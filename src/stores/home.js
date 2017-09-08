import Store from './base';

import {
  SEARCH_FETCH_NEXT_SUCCESS,
  SEARCH_FETCH,
  SEARCH_FETCH_SUCCESS,
  SEARCH_FETCH_FAILED,
} from './../constants/actions';
import {
  RESULT_LOAD_MORE_CLASS,
  RESULT_LOAD_MORE_CLASS_HIDDEN,
 } from './../constants/dom-selector';
class HomeStore extends Store {

  constructor() {
    super();
    this.home = [];
    this.isDirty = false;
    this.pagination = {
      count: 0,
      offset: 0,
      total_count: 0
    };
  }

  canLoadMore() {
    return this.pagination.total_count > this.pagination.count;
  }

  add(response) {
    this.isDirty = true;
    this.home = this.home.concat(response.data);
    this.pagination = response.pagination;
    this.onChange(SEARCH_FETCH_NEXT_SUCCESS);
  }

  replace(response) {
    this.isDirty = true;
    this.home = [].concat(response.data);
    this.pagination = response.pagination;
    this.onChange(SEARCH_FETCH_SUCCESS);
  }

  flush() {
    this.home = [];
    this.onChange();
  }
}

let instance;
export default class StoreSingleton {

  static getInstance(){
    if(!instance){
      instance = new HomeStore();
    }
    return instance;
  }
}
