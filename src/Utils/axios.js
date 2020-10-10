import axios from 'axios';

import store from '../Store/index';
import { fetchToken } from './auth';
import { refreshToken, requestAuth } from '../Store/Actions/auth';

export function getAxiosInstance() {
  return axios.create();
}

export async function getAuthenticatedInstance() {
  const auth = store.getState().auth;
  if (auth && auth.isLoggedIn && auth.userToken) {
    let response = await fetchToken(auth.userToken.refreshToken);

    if (response.status === 200) {
      store.dispatch(refreshToken(response.data.accessToken));

      return axios.create({
        headers: {
          Authorization: `Bearer ${response.data.accessToken}`,
        },
      });
    }
  }

  store.dispatch(requestAuth());
  return;
}
