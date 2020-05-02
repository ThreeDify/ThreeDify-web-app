import { LOGIN_ACTION, LOGOUT_ACTION } from '../actionTypes';

export function isLoggedIn(state = { isLoggedIn: false }, action) {
  switch (action.type) {
    case LOGIN_ACTION:
      return {
        isLoggedIn: true,
      };
    case LOGOUT_ACTION:
      return {
        isLoggedIn: false,
      };
    default:
      return {
        isLoggedIn: state.isLoggedIn,
      };
  }
}

export function userToken(state = { userToken: null }, action) {
  switch (action.type) {
    case LOGIN_ACTION:
      return {
        userToken: action.payload,
      };
    case LOGOUT_ACTION:
      return {
        userToken: null,
      };
    default:
      return {
        userToken: state.userToken,
      };
  }
}
