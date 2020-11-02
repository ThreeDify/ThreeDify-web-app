import { combineReducers } from 'redux';
import {
  FETCH_USER_BEGINS_ACTION,
  FETCH_USER_FAILED_ACTION,
  FETCH_USER_SUCCESS_ACTION,
  LOGOUT_ACTION,
} from '../actionTypes';

function user(state = null, action) {
  switch (action.type) {
    case FETCH_USER_SUCCESS_ACTION:
      return {
        ...action.payload,
      };
    case LOGOUT_ACTION:
    case FETCH_USER_BEGINS_ACTION:
    case FETCH_USER_FAILED_ACTION:
      return null;
    default:
      return state;
  }
}

function isUserBeingFetched(state = false, action) {
  switch (action.type) {
    case FETCH_USER_BEGINS_ACTION:
      return true;
    case FETCH_USER_SUCCESS_ACTION:
    case FETCH_USER_FAILED_ACTION:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  me: user,
  isUserBeingFetched: isUserBeingFetched,
});
