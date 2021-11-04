import {
  USER_DELETE_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCEED,
  UserDeleteApiResponse,
  UsersActions,
  UserState,
} from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';

export const userDelete =
  (): AppThunk<Promise<UserState>, UsersActions> =>
  async (dispatch, getState): Promise<UserState> => {
    const { Users: usersBeforeRequest } = getState();

    try {
      dispatch({
        type: USER_DELETE_REQUEST,
        payload: usersBeforeRequest,
      });

      await HttpClient.delete<void, UserDeleteApiResponse>('/users/me/');

      dispatch({
        type: USER_DELETE_SUCCEED,
        payload: usersBeforeRequest,
      });

      return;
    } catch (error) {
      const { Users: UsersOnError } = getState();

      dispatch({
        type: USER_DELETE_FAILURE,
        payload: {
          ...UsersOnError,
          errors: [...(UsersOnError?.errors || []), error],
        },
      });

      return error;
    }
  };
