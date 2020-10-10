import { getAuthenticatedInstance } from './axios';
import { USER_INFO_URL } from '../Constants/apiUrls';

export async function fetchUser() {
  let instance = await getAuthenticatedInstance();
  return instance.get(USER_INFO_URL);
}
