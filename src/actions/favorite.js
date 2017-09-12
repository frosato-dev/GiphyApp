import {
  ADD_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_SUCCESS
} from './../constants/actions';

export const add = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_FAVORITE_SUCCESS,
      payload: getState().search.listById[id],
    })
  }
}

export const remove = (id) => {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_FAVORITE_SUCCESS,
      payload: getState().favorites.listById[id],
    })
  }
}

