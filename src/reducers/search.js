import { normalize, schema } from 'normalizr';

import {
  SEARCH_REQUEST,
  SEARCH_REQUEST_SUCCESS,
  SEARCH_REQUEST_FAILURE,
} from './../constants/actions';

export const getUrlParam = (url, key) => new URL(url).searchParams.get(key);

const initialState = {
  query: getUrlParam(window.location, 'q'),
  results: '',
  pagination: {
    total_count: 0,
  },
  list: [],
  listById: {},
  isLoading: false,
};

const KEY = 'gif';
const gif = new schema.Entity(KEY);
const gifSchema = new schema.Array(gif);

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SEARCH_REQUEST_SUCCESS:
      const data = normalize(action.payload.data, gifSchema);

      // Replace
      if(action.meta.query !== state.query) {
        return {
          ...state,
          query: action.meta.query,
          pagination: action.payload.pagination,
          listById: data.entities[KEY],
          list: data.result,
          isLoading: false
        }
      }

      // Append
      return {
        ...state,
        query: action.meta.query,
        pagination: action.payload.pagination,
        listById: Object.assign({}, state.listById, data.entities[KEY]),
        list: [].concat(state.list, data.result),
        isLoading: false,
      };

    case SEARCH_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
