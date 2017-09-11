require("babel-core/register");
require("babel-polyfill");

import style from './index.css';
import Router, { getCurrentWindowUrlParam } from './utils/router';
import Routes from './routes';
import Dom from './utils/dom';

Dom.ready()
  .then(() => {

    const search = getCurrentWindowUrlParam('q');

    // Init Router
    Router(Routes(search), () => {
      //console.log('route has changed')
    });
  });
