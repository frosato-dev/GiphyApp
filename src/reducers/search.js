import { normalize, schema } from 'normalizr';

import {
  SEARCH_REQUEST,
  SEARCH_REQUEST_SUCCESS,
  SEARCH_REQUEST_FAILURE,
} from './../constants/actions';

const initialState = {
  query: '',
  results: '',
  pagination: null,
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
      return {
        ...state,
        pagination: action.payload.pagination,//new Map(pagination),
        listById: data.entities[KEY],
        list: data.result,
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
