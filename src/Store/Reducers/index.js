import { isLoggedIn, userToken } from './auth';

export default function (state, action) {
  return {
    ...isLoggedIn(state, action),
    ...userToken(state, action),
  };
}
