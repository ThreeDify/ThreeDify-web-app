import axios from 'axios';

import store from '../Store/index';
import { fetchToken } from './auth';
import { refreshToken } from '../Store/Actions/auth';

const INSTANCE = axios.create({
  headers: {
    'X-THREEDIFY-APP-KEY': process.env.API_KEY,
    'X-THREEDIFY-APP-SECRET': process.env.API_SECRET,
  },
});

export function getAxiosInstance() {
  return INSTANCE;
}

export async function getAuthenticatedInstance() {
  const auth = store.getState().auth;
  if (!auth || !auth.isLoggedIn) {
    return INSTANCE;
  }

  let response = await fetchToken(auth.userToken.refresh);
  store.dispatch(refreshToken(response.data.access));

  return INSTANCE;
}
