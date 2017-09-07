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

  // @TODO to es6
  static hasClass(el, className) {
    if (el.classList)
      return el.classList.contains(className)
    else
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
  }

  // @TODO to es6
  static addClass(el, className) {
    if (el.classList)
      el.classList.add(className)
    else if (!Dom.hasClass(el, className)) el.className += " " + className
  }

  // @TODO to es6
  static removeClass(el, className) {
    if (el.classList)
      el.classList.remove(className)
    else if (Dom.hasClass(el, className)) {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
      el.className = el.className.replace(reg, ' ')
    }
  }
}
