import Store from './base';

import {
  ADD as ACTION_ADD,
  REPLACE as ACTION_REPLACE,
  REMOVE as ACTION_REMOVE,
} from './../constants/actions';

class HomeStore extends Store {

  constructor() {
    super();
    this.home = [];
    this.pagination = {
      count: 0,
      offset: 0,
      total_count: 0
    };
  }

  canLoadMore() {
    return this.pagination.total_count > this.pagination.count;
  }

  // data always array
  add(response) {
    this.home = this.home.concat(response.data);
    this.pagination = response.pagination;
    this.onChange(ACTION_ADD);
  }

  replace(response) {
    this.home = [].concat(response.data);
    this.pagination = response.pagination;
    this.onChange(ACTION_REPLACE);
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
