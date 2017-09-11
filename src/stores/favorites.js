import Store from './base';

import {
  FAVORITES as SK_FAVORITES,
} from './../constants/storage';

import {
  FAVORITE_ADD_SUCCESS,
  FAVORITE_REMOVE_SUCCESS,
} from './../constants/actions';


class FavoriteStore extends Store {

  constructor() {
    super();
    this.favorites = JSON.parse(localStorage.getItem(SK_FAVORITES)) || {};
  }

  addOrRemove(item) {
    console.log('innn')
    let action;
    if(this.favorites[item.id]){
      action = FAVORITE_REMOVE_SUCCESS;
      delete this.favorites[item.id];
    } else {
      action = FAVORITE_ADD_SUCCESS;
      this.favorites[item.id] = item;
    }
    this.save();
    this.onChange(action);
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
