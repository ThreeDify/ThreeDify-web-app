import {
  FETCH_USER_BEGINS_ACTION,
  FETCH_USER_SUCCESS_ACTION,
  FETCH_USER_FAILED_ACTION,
  NOP_ACTION,
} from '../actionTypes';
import { STATUS_OK } from '../../Constants/httpStatus';
import { fetchAuthenticatedUser as fetchAuthenticatedUserApi } from '../../Utils/user';

export function fetchAuthenticatedUser() {
  return async (dispatch, getState) => {
    const { user } = getState();
    if (!user.isUserBeingFetched) {
      dispatch({ type: FETCH_USER_BEGINS_ACTION });

      try {
        let response = await fetchAuthenticatedUserApi();

        if (response.status === STATUS_OK) {
          dispatch({
            type: FETCH_USER_SUCCESS_ACTION,
            payload: response.data,
          });
        } else {
          dispatch({
            type: FETCH_USER_FAILED_ACTION,
            payload: {
              message: 'Error occurred while fetching user info.',
              status: response.status,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: FETCH_USER_FAILED_ACTION,
          payload: {
            message: 'Error occurred while fetching user info.',
            status: err.response && err.response.status,
          },
        });
      }

      return;
    }
    dispatch({ type: NOP_ACTION });
  };
}
