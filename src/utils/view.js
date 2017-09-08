import Dom from './../utils/dom';
import getGridItems from './../templates/get-grid-items';
import {
  SEARCH_FORM_CLASS,
  SEARCH_FORM_CLASS_HIDDEN,
  SEARCH_FORM_CLEAR_CLASS,
  SEARCH_FORM_CLEAR_CLASS_HIDDEN,
  SEARCH_INPUT_CLASS,
  SEARCH_RESULTS_ID,
  RESULT_LOAD_MORE_CLASS,
  RESULT_LOAD_MORE_CLASS_HIDDEN,
  RESULT_EMPTY_CLASS,
  RESULT_EMPTY_CLASS_HIDDEN,
  RESULT_LOADING_CLASS,
  RESULT_LOADING_CLASS_HIDDEN,
  RESULT_COUNT_CLASS,
  RESULT_COUNT_CLASS_HIDDEN,
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
  static showInputFormClear(){
    Dom.show(SEARCH_FORM_CLEAR_CLASS, SEARCH_FORM_CLEAR_CLASS_HIDDEN);
  }
  static hideInputFormClear(){
    Dom.hide(SEARCH_FORM_CLEAR_CLASS, SEARCH_FORM_CLEAR_CLASS_HIDDEN);
  }
  static showLoadMore(){
    Dom.show(RESULT_LOAD_MORE_CLASS, RESULT_LOAD_MORE_CLASS_HIDDEN)
  }
  static hideLoadMore(){
    Dom.hide(RESULT_LOAD_MORE_CLASS, RESULT_LOAD_MORE_CLASS_HIDDEN)
  }
  static showResultText(){
    Dom.show(RESULT_COUNT_CLASS, RESULT_COUNT_CLASS_HIDDEN)
  }
  static hideResultText(){
    Dom.hide(RESULT_COUNT_CLASS, RESULT_COUNT_CLASS_HIDDEN)
  }
  static setResultText(count, total){
    const item = count > 1 ? 'gifs' : 'gif';
    const search = Dom.get(SEARCH_INPUT_CLASS)[0].value; // @Fixme, get from top, but issue with 'this' context.
    console.log(search)
    Dom.get(RESULT_COUNT_CLASS)[0].innerHTML = `
      Viewing <span>${count}</span> ${item} on <span>${total}</span> for search: <span>${search}</span>
    `;
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
  static toggleLoadMore(canLoadMore) {
    if(canLoadMore) {
      View.showLoadMore();
    } else {
      View.hideLoadMore();
    }
  }
}
