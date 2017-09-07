import {
  FAVORITES as SK_FAVORITES,
  FAVORITES_BY_ID as SK_FAVORITES_BY_ID,
} from './constants/storage';
import {
  ADD as ACTION_ADD,
  REPLACE as ACTION_REPLACE,
  REMOVE as ACTION_REMOVE,
} from './constants/actions';


class Store {

  constructor() {

    this.favorites = [];
    this.home = [];
    this.pagination = {
      count: 0,
      offset: 0,
      total_count: 0
    };

    this._subscribers = new Set();

    this.populateFromStorage();
  }

  populateFromStorage() {
    // Initilize Favorites from LocalStorage
    this.favorites.listById = JSON.parse(localStorage.getItem(SK_FAVORITES_BY_ID));
    this.favorites.list = JSON.parse(localStorage.getItem(SK_FAVORITES));
  }

  canLoadMore() {
    console.log(this.pagination)
    return this.pagination.total_count > this.pagination.count;
  }

  // data always array
  add(key, response) {
    if(this[key]) {
      this[key] = this[key].concat(response.data);
    }
    if(key === 'home') {
      this.pagination = response.pagination;
    }
    this.onChange(key, ACTION_ADD);
  }

  replace(key, response) {
    if(this[key]) {
      this[key] = response.data;
    }
    if(key === 'home') {
      this.pagination = response.pagination;
    }
    this.onChange(key, ACTION_REPLACE);
  }

  /*
  remove(key, data) {
    this.onChange(key, ACTION_REMOVE);
  }
  */

  flushHome() {
    this.home = Object.assign({}, defaultHome);
    this.onChange();
  }

  save() {
    // Use promise so we can easily change storage (async)
    return new Promise((resolve, reject) => {
      localStorage.setItem(SK_FAVORITES_BY_ID, JSON.stringify(this.favorites.listById));
      localStorage.setItem(SK_FAVORITES, JSON.stringify(this.favorites.list));
      return resolve();
    });
  }

  subscribe(callback) {
    this._subscribers.add(callback);
  }

  unsubscribe(callback) {
    this._subscribers.remove(callback);
  }

  onChange(key, action) {
    this._subscribers.forEach(callback => callback(key, action));
  }
}

let instance;
export default class StoreSingleton {

  static getInstance(){
    if(!instance){
      instance = new Store();
    }
    return instance;
  }
}
