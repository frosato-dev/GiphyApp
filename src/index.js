require("babel-core/register");
require("babel-polyfill");

import style from './index.css';
import Router, { getCurrentWindowUrlParam } from './utils/router';
import Routes from './routes';
import Dom from './utils/dom';
import SearchCtrl from './controllers/search';

Dom.ready()
  .then(() => {

    let searchCtrl;
    const search = getCurrentWindowUrlParam('q');

    const routeChangeCallback = (nextRoute) => {
      // Bind Search to Next Controller
      if(!searchCtrl) {
         // Get initial search query
        searchCtrl = new SearchCtrl(search, nextRoute.controller);
      } else {
        searchCtrl.setCallback(nextRoute.controller); // if controller.search is passed,  issue with "this" context. @TODO Findout
      }
    };

    // Init Router
    Router(Routes(search), routeChangeCallback);
  });
