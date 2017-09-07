require("babel-core/register");
require("babel-polyfill");

import style from './index.css';
import Router, { getRoute, getCurrentWindowUrlParam } from './utils/router';
import Dom from './utils/dom';
import HomeCtrl from './controllers/home';
import SearchCtrl from './controllers/search';
import FavoritesCtrl from './controllers/favorites';
import Store from './store';
import { FAVORITES as ROUTE_FAVORITES } from './constants/routes';

Dom.ready()
  .then(() => {

    const Routes = {
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
    const _getRoute = getRoute(Routes);
    const store = Store.getInstance();

    let searchCtrl;

    Router((requestedPath) => {

      const nextRoute = _getRoute(requestedPath);

      // Bind Search to Next Controller
      if(!searchCtrl) {
        const search = getCurrentWindowUrlParam('q'); // Get initial search query
        searchCtrl = new SearchCtrl(search, nextRoute.controller);
      } else {
        searchCtrl.setCallback(nextRoute.controller); // if controller.search is passed,  issue with "this" context. @TODO Findout
      }

      // UnMount Old view and Render current
      Object.values(Routes).map(route => {
        if(route.path !== nextRoute.path) {
          route.controller.unMount();
        }
        nextRoute.controller.render(store);
      })

      // Set title
      document.title = nextRoute.title;
    });
  });
