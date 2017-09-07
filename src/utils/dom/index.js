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

  /**
   * show - Show a dom element by removing it's hidden class
   *
   * @param  {String} elClass target element class
   * @param  {String} hiddenClass the hidden class to remove
   * @return {void}
   */
  static show(elClass, hiddenClass) {
    const el = Dom.get(elClass)[0]
    Dom.removeClass(el, hiddenClass)
  }

  /**
   * show - Show a dom element by adding it's hidden class
   *
   * @param  {String} elClass target element class
   * @param  {String} hiddenClass the hidden class to add
   * @return {void}
   */
  static hide(elClass, hiddenClass) {
    const el = Dom.get(elClass)[0]
    Dom.addClass(el, hiddenClass)
  }

  // @TODO to es6
  static hasClass(el, className) {
    const _className = className.replace('.', '')
    if (el.classList)
      return el.classList.contains(_className)
    else
      return !!el.className.match(new RegExp('(\\s|^)' + _className + '(\\s|$)'))
  }

  // @TODO to es6
  static addClass(el, className) {
    const _className = className.replace('.', '')
    if (el.classList)
      el.classList.add(_className)
    else if (!Dom.hasClass(el, _className)) el.className += " " + _className
  }

  // @TODO to es6
  static removeClass(el, className) {
    const _className = className.replace('.', '')
    if (el.classList)
      el.classList.remove(_className)
    else if (Dom.hasClass(el, _className)) {
      var reg = new RegExp('(\\s|^)' + _className + '(\\s|$)')
      el.className = el.className.replace(reg, ' ')
    }
  }
}
