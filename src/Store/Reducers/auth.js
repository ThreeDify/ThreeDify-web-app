import { combineReducers } from 'redux';

import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  REQUEST_AUTH_ACTION,
  CANCEL_AUTH_ACTION,
  REQUEST_SIGNUP_ACTION,
  CANCEL_SIGNUP_ACTION,
  TOKEN_REFRESH_SUCCESS_ACTION,
  TOKEN_REFRESH_BEGINS_ACTION,
  TOKEN_REFRESH_FAILED_ACTION,
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

function isSignupRequested(state = false, action) {
  switch (action.type) {
    case REQUEST_SIGNUP_ACTION:
      return true;
    case CANCEL_SIGNUP_ACTION:
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
    case TOKEN_REFRESH_SUCCESS_ACTION:
      return action.payload;
    case TOKEN_REFRESH_BEGINS_ACTION:
    case TOKEN_REFRESH_FAILED_ACTION:
    case LOGOUT_ACTION:
      return null;
    default:
      return state;
  }
}

function isTokenBeingFetched(state = false, action) {
  switch (action.type) {
    case TOKEN_REFRESH_BEGINS_ACTION:
      return true;
    case TOKEN_REFRESH_FAILED_ACTION:
    case TOKEN_REFRESH_SUCCESS_ACTION:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  isAuthRequested,
  isSignupRequested,
  isTokenBeingFetched,
  isLoggedIn,
  userToken,
});
