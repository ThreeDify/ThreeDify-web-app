import { FETCH_USER_ACTION, LOGOUT_ACTION } from '../actionTypes';

function user(state = null, action) {
  switch (action.type) {
    case FETCH_USER_ACTION:
      return {
        ...action.payload,
      };
    case LOGOUT_ACTION:
      return null;
    default:
      return state;
  }
}

export default user;
