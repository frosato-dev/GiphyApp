import Dom from './../utils/dom';
import getGridItems from './../templates/get-grid-items';
import {
  SEARCH_FORM_CLASS,
  SEARCH_FORM_CLASS_HIDDEN,
  SEARCH_INPUT_CLASS,
  SEARCH_RESULTS_ID,
  RESULT_LOAD_MORE_CLASS,
  RESULT_LOAD_MORE_CLASS_HIDDEN,
  RESULT_EMPTY_CLASS,
  RESULT_EMPTY_CLASS_HIDDEN,
  RESULT_LOADING_CLASS,
  RESULT_LOADING_CLASS_HIDDEN,
  ICON_FAVORITE_CLASS,
 } from './../constants/dom-selector';

export default class View {

  static showNoResults() {
    Dom.show(RESULT_EMPTY_CLASS, RESULT_EMPTY_CLASS_HIDDEN);
  }
  static hideNoResults() {
    Dom.hide(RESULT_EMPTY_CLASS, RESULT_EMPTY_CLASS_HIDDEN);
  }
  static showLoading() {
    Dom.show(RESULT_LOADING_CLASS, RESULT_LOADING_CLASS_HIDDEN);
  }
  static hideLoading() {
    Dom.hide(RESULT_LOADING_CLASS, RESULT_LOADING_CLASS_HIDDEN);
  }
  static showSearchForm() {
    Dom.show(SEARCH_FORM_CLASS, SEARCH_FORM_CLASS_HIDDEN);
  }
  static hideSearchForm() {
    Dom.hide(SEARCH_FORM_CLASS, SEARCH_FORM_CLASS_HIDDEN);
  }

  static clearResultGrid() {
    Dom.get(SEARCH_RESULTS_ID).innerHTML = '';
  }

  static appendToList(data, favorites) {
    View.hideLoading();
    const html = getGridItems(data, favorites);
    Dom.get(SEARCH_RESULTS_ID)
      .insertAdjacentHTML('beforeend', html);
  }

  static replaceList(data, favorites) {
    View.hideLoading();
    const html = getGridItems(data, favorites);
    Dom.get(SEARCH_RESULTS_ID).innerHTML = html;
  }
}
