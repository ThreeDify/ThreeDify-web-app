import decode from 'jwt-decode';

export function isTokenValid(token) {
  try {
    const { exp } = decode(token);
    if (Date.now() >= exp * 1000) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}
