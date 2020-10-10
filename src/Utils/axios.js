import axios from 'axios';

import store from '../Store/index';
import { fetchToken } from './auth';
import { refreshToken } from '../Store/Actions/auth';

export function getAxiosInstance() {
  return axios.create();
}

export async function getAuthenticatedInstance() {
  const auth = store.getState().auth;
  if (!auth || !auth.isLoggedIn) {
    return getAxiosInstance();
  }

  let response = await fetchToken(auth.userToken.refreshToken);
  store.dispatch(refreshToken(response.data.accessToken));

  return axios.create({
    headers: {
      Authorization: `Bearer ${response.data.accessToken}`,
    },
  });
}
