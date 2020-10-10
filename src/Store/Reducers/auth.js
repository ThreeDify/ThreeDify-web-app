import { combineReducers } from 'redux';

import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  REQUEST_AUTH_ACTION,
  CANCEL_AUTH_ACTION,
  REFRESH_TOKEN_ACTION,
} from '../actionTypes';

function isAuthRequested(state = false, action) {
  switch (action.type) {
    case REQUEST_AUTH_ACTION:
      return true;
    case LOGIN_ACTION:
      return false;
    case CANCEL_AUTH_ACTION:
      return false;
    default:
      return state;
  }
}

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
    case REFRESH_TOKEN_ACTION:
      return {
        refreshToken: state.refreshToken,
        accessToken: action.payload,
      };
    case LOGOUT_ACTION:
      return null;
    default:
      return state;
  }
}

export default combineReducers({ isAuthRequested, isLoggedIn, userToken });
