import toQueryString from './toQueryString';

export default class Api {

  /**
   * get - Ajax Call with a GET action
   *
   * @param  {String} endPoint the url to call
   * @param  {Object} params the query params to serialize
   * @return {Promise} with an object
   */
  static get(endPoint, params) {
    return new Promise((resolve, reject) => {
      const formatedParams = toQueryString(params);
      const formatedEndpoint = `${endPoint}?${formatedParams}`;

      var req = new XMLHttpRequest();
      req.open('GET', formatedEndpoint, true);
      req.onload = () => resolve(JSON.parse(req.responseText));
      req.onerror = () => reject({
        error: JSON.parse(req.responseText),
        endpoint,
        params,
      });
      req.send(formatedParams);
    })
  }
}
