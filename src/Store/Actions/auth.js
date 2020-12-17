import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  CANCEL_AUTH_ACTION,
  REQUEST_AUTH_ACTION,
  CANCEL_SIGNUP_ACTION,
  REQUEST_SIGNUP_ACTION,
  TOKEN_REFRESH_BEGINS_ACTION,
  TOKEN_REFRESH_SUCCESS_ACTION,
  TOKEN_REFRESH_FAILED_ACTION,
  NOP_ACTION,
} from '../actionTypes';
import store from '../index';
import { STATUS_OK } from '../../Constants/httpStatus';
import { fetchToken, logout as logoutApi } from '../../Utils/auth';

export function requestAuth() {
  return {
    type: REQUEST_AUTH_ACTION,
  };
}

export function requestSignup() {
  return {
    type: REQUEST_SIGNUP_ACTION,
  };
}

export function cancelAuth() {
  return {
    type: CANCEL_AUTH_ACTION,
  };
}

export function cancelSignup() {
  return {
    type: CANCEL_SIGNUP_ACTION,
  };
}

export function refreshToken(token) {
  return async (dispatch, getState) => {
    const { isTokenBeingFetched } = getState().auth;
    if (!isTokenBeingFetched) {
      dispatch({ type: TOKEN_REFRESH_BEGINS_ACTION });
      try {
        let response = await fetchToken(token.refreshToken);

        if (response.status === STATUS_OK) {
          dispatch({
            type: TOKEN_REFRESH_SUCCESS_ACTION,
            payload: response.data,
          });
        } else {
          dispatch({
            type: TOKEN_REFRESH_FAILED_ACTION,
          });
        }
      } catch (err) {
        dispatch({
          type: TOKEN_REFRESH_FAILED_ACTION,
        });
      }

      return;
    }

    await new Promise((resolve) => {
      const unsubscribe = store.subscribe(() => {
        const newState = store.getState();
        if (!newState.auth.isTokenBeingFetched) {
          unsubscribe();
          resolve();
        }
      });
    });

    dispatch({ type: NOP_ACTION });
  };
}

export function login(token) {
  return {
    type: LOGIN_ACTION,
    payload: token,
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      await logoutApi();
    } finally {
      dispatch({
        type: LOGOUT_ACTION,
      });
    }
  };
}
