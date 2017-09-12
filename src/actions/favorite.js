import {
  ADD_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_SUCCESS
} from './../constants/actions';

export const add = (dispatch) => item => dispatch({
  type: ADD_FAVORITE_SUCCESS,
  payload: item, //etState().search.listById[id],
});

export const remove = dispatch => item => dispatch({
  type: REMOVE_FAVORITE_SUCCESS,
  payload: item, //getState().favorites.listById[id],
});
