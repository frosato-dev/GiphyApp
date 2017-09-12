import {
  ADD_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_SUCCESS
} from './../constants/actions';

const _initialState = {
  list: [],
  listById: {},
};

const STORAGE_KEY = 'FAVORITES';
const localStorageData = localStorage.getItem(STORAGE_KEY);
const initialState = JSON.parse(localStorageData) || _initialState;


export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FAVORITE_SUCCESS: {
      const item = action.payload;
      const _state = {
        ...state,
        listById: {...state.listById, [item.id]: Object.assign({}, item)},
        list: [item.id].concat(state.list),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(_state));
      return _state;
    }
    case REMOVE_FAVORITE_SUCCESS: {
      const item = action.payload;
      const _state = {
        ...state,
        listById: Object.assign({}, state.listById).delete(item.id),
        list: state.list.filter(item => item !== item.id),
      };
      console.log(_state)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(_state));
      return _state;
    }
    default:
      return state;
  }
}
