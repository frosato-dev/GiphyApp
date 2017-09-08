require("babel-core/register");
require("babel-polyfill");

import style from './index.css';
import Router, { getCurrentWindowUrlParam } from './utils/router';
import Dom from './utils/dom';
import HomeCtrl from './controllers/home';
import SearchCtrl from './controllers/search';
import FavoritesCtrl from './controllers/favorites';
import { FAVORITES as ROUTE_FAVORITES } from './constants/routes';

Dom.ready()
  .then(() => {

    const routes = {
      'home' : {
        'path' : '/',
        'controller': new HomeCtrl(),
        'title': 'Homepage',
      },
      'favorites' : {
        'path' : ROUTE_FAVORITES,
        'controller': new FavoritesCtrl(),
        'title': 'Favorites',
      }
    };

    let searchCtrl;

    const routeChangeCallback = (nextRoute) => {

      // Bind Search to Next Controller
      if(!searchCtrl) {
        const search = getCurrentWindowUrlParam('q'); // Get initial search query
        searchCtrl = new SearchCtrl(search, nextRoute.controller);
      } else {
        searchCtrl.setCallback(nextRoute.controller); // if controller.search is passed,  issue with "this" context. @TODO Findout
      }

    };

    Router(routes, routeChangeCallback);
  });
