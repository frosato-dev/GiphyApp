export default class Store {

  constructor() {
    this._subscribers = new Set();
  }

  subscribe(callback) {
    this._subscribers.add(callback);
  }

  unsubscribe(callback) {
    if (this._subscribers.has(callback)){
      this._subscribers.delete(callback);
    }
  }

  onChange(key, action) {
    this._subscribers.forEach(callback => callback(key, action));
  }
}
