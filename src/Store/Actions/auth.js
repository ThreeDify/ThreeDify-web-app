import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  CANCEL_AUTH_ACTION,
  REQUEST_AUTH_ACTION,
  REFRESH_TOKEN_ACTION,
  CANCEL_SIGNUP_ACTION,
  REQUEST_SIGNUP_ACTION,
} from '../actionTypes';

export function requestAuth() {
  return {
    type: REQUEST_AUTH_ACTION,
  };
}

export function requestSignup() {
  return {
    type: REQUEST_SIGNUP_ACTION,
  };
}

export function cancelAuth() {
  return {
    type: CANCEL_AUTH_ACTION,
  };
}

export function cancelSignup() {
  return {
    type: CANCEL_SIGNUP_ACTION,
  };
}

export function refreshToken(token) {
  return {
    type: REFRESH_TOKEN_ACTION,
    payload: token,
  };
}

export function login(token) {
  return {
    type: LOGIN_ACTION,
    payload: token,
  };
}

export function logout() {
  return {
    type: LOGOUT_ACTION,
  };
}
