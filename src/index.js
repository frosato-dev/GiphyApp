import style from './index.css';

import getUrlParam from './utils/router/getUrlParams';
import Dom from './utils/dom';
import GiphyService from './services/giphy';

import { SEARCH_RESULTS_ID } from './constants/dom-selector';
import getGridItems from './templates/get-grid-items';

const urlParams = getUrlParam(window.location, 'q');
const search = urlParams['q'];

Dom.ready()
  .then(() => {

    // Listen for input change (change /input) event
    Dom.get(".header__form-input")[0].addEventListener('input', (e) => {
       alert('Horray! Someone wrote "' + e.target.value + '"!');
    });

    // Check if query is already set

    GiphyService.search('party', 0, 10).then((res) => {

      Dom.get(SEARCH_RESULTS_ID)
        .insertAdjacentHTML('beforeend', getGridItems(res.data));

    }).catch(e => {
      // Handle Error
      console.log(e)
    })
  });
