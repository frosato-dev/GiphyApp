import Store from './base';

import {
  FAVORITES as SK_FAVORITES,
  FAVORITES_BY_ID as SK_FAVORITES_BY_ID,
} from './constants/storage';

import {
  ADD as ACTION_ADD,
  REPLACE as ACTION_REPLACE,
  REMOVE as ACTION_REMOVE,
} from './constants/actions';


class FavoriteStore extends Store {

  constructor() {
    super();
    this.favorites = [];
    this.populateFromStorage();
  }

  populateFromStorage() {
    // Initilize Favorites from LocalStorage
    this.favorites.listById = JSON.parse(localStorage.getItem(SK_FAVORITES_BY_ID));
    this.favorites.list = JSON.parse(localStorage.getItem(SK_FAVORITES));
  }

  // data always array
  add(response) {
    this.onChange(ACTION_ADD);
  }

  replace(response) {
    this.onChange(ACTION_REPLACE);
  }


  flush() {
    this.favorites = [];
    this.save();
    this.onChange();
  }

  save() {
    return new Promise((resolve, reject) => {
      localStorage.setItem(SK_FAVORITES, JSON.stringify(this.favorites));
      return resolve();
    });
  }
}

let instance;
export default class StoreSingleton {

  static getInstance(){
    if(!instance){
      instance = new FavoriteStore();
    }
    return instance;
  }
}
