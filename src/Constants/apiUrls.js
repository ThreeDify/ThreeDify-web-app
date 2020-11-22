/**
 * Constants for api urls
 */

export const LOGIN_URL = process.env.API_URL + '/auth/login';
export const LOGOUT_URL = process.env.API_URL + '/auth/logout';
export const REFRESH_TOKEN_URL = process.env.API_URL + '/auth/refresh';

export const REGISTER_URL = process.env.API_URL + '/auth/register';

export const USER_INFO_URL = process.env.API_URL + '/users/me';
export const UNIQUE_EMAIL_URL = process.env.API_URL + '/users/uniqueEmail';
export const UNIQUE_USERNAME_URL =
  process.env.API_URL + '/users/uniqueUsername';

export const RECONSTRUCTION_CREATE_URL =
  process.env.API_URL + '/reconstructions/create';
export const IMAGE_URL = process.env.API_URL + '/images/{fileName}';
export const RECONSTRUCTION_FETCH_URL =
  process.env.API_URL + '/reconstructions';
export const USER_RECONSTRUCTIONS_API =
  process.env.API_URL + '/users/{userId}/reconstructions';
