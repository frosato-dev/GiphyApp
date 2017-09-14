import { CALL_API } from 'redux-api-middleware';
import queryString from 'query-string';
import { push } from 'react-router-redux';

import {
  SEARCH_REQUEST,
  SEARCH_REQUEST_SUCCESS,
  SEARCH_REQUEST_FAILURE,
} from './../constants/actions';

const BASE_URL = 'https://api.giphy.com';
const API_KEY = '87ff4ebc68774374b2f22f18d5c9cdd5';
const FORMAT = 'json';

export const updateQuery = (query) => {
  return push({
    search: queryString.stringify({q: query}),
  })
};

export const fetch = (dispatch) => (query, offset = 0, limit = 20) => {

  return ({
    [CALL_API]: {
      types: [
        SEARCH_REQUEST,
        {
          type: SEARCH_REQUEST_SUCCESS,
          meta: {
            query,
            offset,
            limit,
          }
        },
        SEARCH_REQUEST_FAILURE
      ],
      endpoint: `${BASE_URL}/v1/gifs/search?${queryString.stringify({
        offset,
        limit,
        q: query,
        api_key: API_KEY,
        fmt: FORMAT,
      })}`,
      method: 'GET',
    }
  })
};



