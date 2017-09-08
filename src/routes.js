import HomeCtrl from './controllers/view-home';
import FavoritesCtrl from './controllers/view-favorites';

import { FAVORITES as ROUTE_FAVORITES } from './constants/routes';

export default (onLoadSearchQuery) => ({
  'home' : {
    'path' : '',
    'controller': new HomeCtrl(onLoadSearchQuery),
    'title': 'Homepage',
    'hash' : '#home'
  },
  'favorites' : {
    'path' : ROUTE_FAVORITES,
    'controller': new FavoritesCtrl(),
    'title': 'Favorites',
    'hash' : '#favorites'
  }
});
