import {
  FETCH_FAVORITE_REQUEST,
  FETCH_FAVORITE_SUCCESS,
  ADD_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_SUCCESS
} from './../constants/actions';

export const fetch = () => {
  return dispatch => {
    dispatch({
      type: FETCH_FAVORITE_REQUEST
    })
  }
}

export const add = (item) => {
  return dispatch => {
    dispatch({
      type: ADD_FAVORITE_SUCCESS,
      payload: item,
    })
  }
}

export const remove = (item) => {
  return dispatch => {
    dispatch({
      type: REMOVE_FAVORITE_SUCCESS,
      payload: item,
    })
  }
}

