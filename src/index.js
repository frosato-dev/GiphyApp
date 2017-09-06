import style from './index.css';

import getUrlParam from './utils/router/getUrlParams';
import Dom from './utils/dom';
import GiphyService from './services/giphy';

const urlParams = getUrlParam(window.location, 'q');
const search = urlParams['q'];

Dom.ready()
  .then(() => {
    console.log('Dom is Ready', Dom.get('#app'));

    GiphyService.search('love', 0, 1).then((data) => {
      console.log(data);
    }).catch(e => {
      // Handle Error
      console.log(e)
    })

  });
