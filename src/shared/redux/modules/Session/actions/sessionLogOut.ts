import {
  SESSION_LOG_IN_FAILURE,
  SESSION_LOG_OUT_REQUEST,
  SESSION_LOG_OUT_SUCCESS,
} from 'Modules/Session/session.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { SessionActions } from '../session.types';

const emptyUser = {
  loading: false,
  id: undefined,
  order: undefined,
  name: undefined,
  email: undefined,
  status: undefined,
  level: undefined,
  logged: undefined,
  token: undefined,
  iat: undefined,
  errors: undefined,
  passwordRequested: undefined,
  passwordReset: undefined,
  image: undefined,
  statement: undefined,
  location: undefined,
  createdAt: undefined,
  updatedAt: undefined,
};

export const sessionLogOut =
  (): AppThunk<Promise<void>, SessionActions> =>
  async (dispatch, getState): Promise<void> => {
    const { Session: sessionBeforeRequest } = getState();

    dispatch({
      type: SESSION_LOG_OUT_REQUEST,
      payload: {
        ...sessionBeforeRequest,
        loading: true,
      },
    });

    // Remove the cookie on server using the base api
    try {
      await HttpClient.delete('/login');

      dispatch({
        type: SESSION_LOG_OUT_SUCCESS,
        payload: emptyUser,
      });
    } catch (error) {
      const { Session: sessionOnError } = getState();

      dispatch({
        type: SESSION_LOG_IN_FAILURE,
        payload: {
          ...emptyUser,
          errors: [...(sessionOnError?.errors || []), error],
        },
      });
    }
  };
