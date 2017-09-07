require("babel-core/register");
require("babel-polyfill");

import style from './index.css';
import { getCurrentWindowUrlParam } from './utils/router/getUrlParams';
import Dom from './utils/dom';
import HomeCtrl from './controllers/home';

Dom.ready()
  .then(() => {

    // Cheack current route


    // Get initial search
    const search = getCurrentWindowUrlParam('q');

    // Run Homepage
    const homeCtrl = new HomeCtrl(search);

  });
