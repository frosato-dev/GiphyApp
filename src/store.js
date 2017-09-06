import { FAVORITES as SK_FAVORITES } from './constants/storage';

class Store {

  const favorites = [];
  const listById = new Map();
  const list = new Set();

  constructor() {
    // Initilize Favorites from LocalStorage
    const stringifiedFavorites = LocalStorage.getItem(SK_FAVORITES);
    this.favorites = JSON.parse(stringifiedFavorites);
  }

  addToFavorites() {
    //@TODO
    return this.saveFavorites();
  }

  removeFromFavorites() {
    //@TODO
    return this.saveFavorites();
  }

  saveFavorites() {
    // Use promise so we can easily change storage (async)
    return new Promise((resolve, reject) => {
      const stringifiedFavorites = JSON.stringify(this.favorites);
      LocalStorage.setItem(SK_FAVORITES);
      return resolve();
    });
  }
}

let instance;
export default class StoreSingleton {

  // @TODO make this private
  getInstance(){
    if(!instance){
      instance = new StoreInstance();
    }
    return instance;
  }

  static add(item) {
    return StoreSingleton.getInstance().add(item);
  }

  static remove(item) {
    return StoreSingleton.getInstance().remove(item);
  }
}
