import { LOGIN_ACTION, LOGOUT_ACTION } from '../actionTypes';

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
