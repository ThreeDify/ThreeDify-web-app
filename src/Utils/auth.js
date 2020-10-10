import { getAxiosInstance } from './axios';
import { LOGIN_URL, REFRESH_TOKEN_URL } from '../Constants/apiUrls';

export function login(username, password) {
  return getAxiosInstance().post(LOGIN_URL, {
    username: username,
    password: password,
  });
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
