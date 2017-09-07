import Api from './../utils/api';

let configInstance = null;

// @TODO MOVE TO CONFIG OR .ENV
const BASE_URL = 'http://api.giphy.com';
const API_KEY = '87ff4ebc68774374b2f22f18d5c9cdd5';
const FORMAT = 'json';

export default class GiphySerice {

  /**
   * search - Call the /search endPoint
   *
   * @param  {String} query the key word to search
   * @param  {String} offset An optional results offset. Defaults to 0.
   * @param  {type} limit The maximum number of records to return. Defaults to 25
   * @return {Promise} the result of the API Call
   */
  static search(query, offset = 0, limit = 25){
    const endPoint = `${BASE_URL}/v1/gifs/search`;
    return Api.get(endPoint, {
      offset,
      limit,
      q: query,
      api_key: API_KEY,
      fmt: FORMAT,
    });
  }
}
