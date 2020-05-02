import { FETCH_USER_ACTION } from '../actionTypes';

export function user(loggedInUser) {
  return {
    type: FETCH_USER_ACTION,
    payload: loggedInUser,
  };
}
