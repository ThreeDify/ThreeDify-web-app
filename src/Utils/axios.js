import axios from 'axios';

import store from '../Store/index';
import { isTokenValid } from './tokens';
import { refreshToken, requestAuth } from '../Store/Actions/auth';

export function getAxiosInstance() {
  return axios.create();
}

export async function getAuthenticatedInstance() {
  const auth = store.getState().auth;
  if (auth && auth.isLoggedIn && auth.userToken) {
    if (isTokenValid(auth.userToken.accessToken)) {
      return axios.create({
        headers: {
          Authorization: `Bearer ${auth.userToken.accessToken}`,
        },
      });
    } else if (isTokenValid(auth.userToken.refreshToken)) {
      await store.dispatch(refreshToken(auth.userToken));

      const { userToken } = store.getState().auth;
      if (userToken) {
        return axios.create({
          headers: {
            Authorization: `Bearer ${userToken.accessToken}`,
          },
        });
      }
    }
  }

  store.dispatch(requestAuth());
  return;
}
