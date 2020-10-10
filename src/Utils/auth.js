import { getAuthenticatedInstance, getAxiosInstance } from './axios';
import {
  LOGIN_URL,
  LOGOUT_URL,
  REGISTER_URL,
  REFRESH_TOKEN_URL,
} from '../Constants/apiUrls';

export function login(username, password) {
  return getAxiosInstance().post(LOGIN_URL, {
    username: username,
    password: password,
  });
}

export async function logout() {
  return (await getAuthenticatedInstance()).delete(LOGOUT_URL);
}

export function fetchToken(refreshToken) {
  return getAxiosInstance().post(
    REFRESH_TOKEN_URL,
    {},
    {
      headers: {
        'X-REFRESH-TOKEN': refreshToken,
      },
    }
  );
}

export function signup(userData) {
  return getAxiosInstance().post(REGISTER_URL, userData);
}
