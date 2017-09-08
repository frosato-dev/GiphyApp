require("babel-core/register");
require("babel-polyfill");

import style from './index.css';
import Router, { getCurrentWindowUrlParam } from './utils/router';
import Routes from './routes';
import Dom from './utils/dom';
import FavoriteCtrl from './controllers/favorite';

Dom.ready()
  .then(() => {

    const search = getCurrentWindowUrlParam('q');

    new FavoriteCtrl().render(); // this is bad

    // Init Router
    Router(Routes(search), () => {
      console.log('route has changed')
    });
  });
