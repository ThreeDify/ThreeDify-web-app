import axios from 'axios';

import { LOGIN_URL } from '../Constants/apiUrls';

export function login(username, password) {
  return axios.post(
    LOGIN_URL,
    {
      username: username,
      password: password,
    },
    {
      headers: {
        'X-THREEDIFY-APP-KEY': process.env.API_KEY,
        'X-THREEDIFY-APP-SECRET': process.env.API_SECRET,
      },
    }
  );
}
