import { FETCH_USER_ACTION } from '../actionTypes';

export function setUser(loggedInUser) {
  return {
    type: FETCH_USER_ACTION,
    payload: loggedInUser,
  };
}
