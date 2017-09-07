export default class Store {

  constructor() {
    this._subscribers = new Set();
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
