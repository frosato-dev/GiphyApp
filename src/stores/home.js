import Store from './base';

import {
  SEARCH_FETCH_NEXT_SUCCESS,
  SEARCH_FETCH_SUCCESS,
} from './../constants/actions';
import {
  RESULT_LOAD_MORE_CLASS,
  RESULT_LOAD_MORE_CLASS_HIDDEN,
 } from './../constants/dom-selector';
class HomeStore extends Store {

  constructor() {
    super();
    this.list = [];
  }

  add(response) {
    this.list = this.list.concat(response.data);
    this.onChange(SEARCH_FETCH_NEXT_SUCCESS);
  }

  replace(response) {
    this.list = [].concat(response.data);
    this.onChange(SEARCH_FETCH_SUCCESS);
  }

  flush() {
    this.list = [];
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
