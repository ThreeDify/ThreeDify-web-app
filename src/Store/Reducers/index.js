import { isLoggedIn } from './auth';

export default function (state, action) {
  return {
    ...isLoggedIn(state, action),
  };
}
