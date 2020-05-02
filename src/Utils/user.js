import axios from 'axios';

import { USER_INFO_URL } from '../Constants/apiUrls';

export function fetchUser(token) {
  return axios.get(USER_INFO_URL, {
    headers: {
      'X-THREEDIFY-APP-KEY': process.env.API_KEY,
      'X-THREEDIFY-APP-SECRET': process.env.API_SECRET,
      Authorization: `JWT ${token.access}`,
    },
  });
}
