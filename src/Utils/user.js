import { getAuthenticatedInstance, getAxiosInstance } from './axios';
import {
  UNIQUE_EMAIL_URL,
  UNIQUE_USERNAME_URL,
  USER_INFO_URL,
} from '../Constants/apiUrls';

export async function fetchAuthenticatedUser() {
  let instance = await getAuthenticatedInstance();
  return instance.get(USER_INFO_URL);
}

export function checkUniqueEmail(email) {
  return getAxiosInstance().get(UNIQUE_EMAIL_URL + `?email=${email}`);
}

export function checkUniqueUsername(username) {
  return getAxiosInstance().get(UNIQUE_USERNAME_URL + `?username=${username}`);
}
