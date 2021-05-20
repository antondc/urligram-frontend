import { SESSION_LOG_IN_FAILURE, SESSION_LOG_OUT_REQUEST } from 'Modules/Session/session.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { SessionActions } from '../session.types';

export const sessionLogOut = (): AppThunk<Promise<void>, SessionActions> => async (dispatch): Promise<void> => {
  const emptyUser = {
    loading: undefined,
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

  // Remove the cookie on server using the base api
  await HttpClient.delete('/login')
    .then(() =>
      dispatch({
        type: SESSION_LOG_OUT_REQUEST,
        payload: emptyUser,
      })
    )
    .catch((error) => {
      dispatch({
        type: SESSION_LOG_IN_FAILURE,
        payload: {
          errors: [error],
          loading: false,
        },
      });
      throw new Error(error);
    });

  return;
};
