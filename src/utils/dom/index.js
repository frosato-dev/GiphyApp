/**
 * getById
 *
 * @param  {String} id
 * @return {DomElement}
 */
const getById = id => document.getElementById(id);

/**
 * getByClass
 *
 * @param  {String} classname
 * @return {DomElements}
 */
const getByClass = classname => document.getElementsByClassName(classname);

/**
 * getByTag
 *
 * @param  {String} tag
 * @return {DomElements}
 */
const getByTag = tag => document.getElementsByTagName(tag);

export default class Dom {

  /**
   * get
   *
   * @param  {String} id/class
   * @return {DomElement(s)}
   */
  static get(selector) {
    if(selector.startsWith('#')) {
      return getById(selector.substr(1))
    }
    if (selector.startsWith('.')) {
      return getByClass(selector.substr(1))
    }
    return getByTag(selector)
  }

  /**
   * ready
   *
   * @return {Promise}
   */
  static ready(callback) {
    return new Promise((resolve, reject) => {
      document.onreadystatechange = function () {
        // I use a callback not a promise to copy JQuery DocumentReady method
        if (document.readyState == "interactive") {
            resolve();
        }
      }
    });
  }
}
