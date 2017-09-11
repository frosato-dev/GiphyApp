import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form'
import search from './search';

export default combineReducers({
  routing,
  form,
  search,
});
