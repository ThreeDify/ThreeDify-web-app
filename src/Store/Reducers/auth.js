import { combineReducers } from 'redux';

import { LOGIN_ACTION, LOGOUT_ACTION } from '../actionTypes';

function isLoggedIn(state = false, action) {
  switch (action.type) {
    case LOGIN_ACTION:
      return true;
    case LOGOUT_ACTION:
      return false;
    default:
      return state;
  }
}

function userToken(state = null, action) {
  switch (action.type) {
    case LOGIN_ACTION:
      return action.payload;
    case LOGOUT_ACTION:
      return null;
    default:
      return state;
  }
}

export default combineReducers({ isLoggedIn, userToken });
