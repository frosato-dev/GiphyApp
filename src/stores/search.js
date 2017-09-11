import Store from './base';
import { SEARCH_IS_LOADING } from './../constants/actions';

class SearchStore extends Store {

  constructor() {
    super();
    this.lastQuery = '';
    this.isLoading = false;
    this.isDirty = false;
    this.pagination = {
      count: 0,
      offset: 0,
      total_count: 0
    };
  }

  receiveResults(res) {
    this.pagination = res.pagination;
    this.setLoadingState(false, false);
  }

  setLoadingState(isLoading, dispatchChange) {
    this.isLoading = !!isLoading;
    this.isDirty = true;
    if(dispatchChange) {
      this.onChange(SEARCH_IS_LOADING);
    }
  }

  canLoadMore() {
    return this.pagination.total_count > this.pagination.count;
  }
}

let instance;
export default class StoreSingleton {

  static getInstance(){
    if(!instance){
      instance = new SearchStore();
    }
    return instance;
  }
}
