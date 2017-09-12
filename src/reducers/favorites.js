import { Map } from 'immutable';

import {
  FETCH_FAVORITE_SUCCESS,
  ADD_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_SUCCESS
} from './../constants/actions';

const initialState = {
  list: new Map(),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVORITE_SUCCESS:
      const items = action.payload;
      return {
        ...state,
        list: new Map(items),
      }
    case ADD_FAVORITE_SUCCESS:
      const item = action.payload;
      return {
        ...state,
        list: state.list.set(item.id, item),
      }

    case REMOVE_FAVORITE_SUCCESS:
      const id = action.payload;
      return {
        ...state,
        list: state.list.delete(id),
      }

    default:
      return state
  }
}
