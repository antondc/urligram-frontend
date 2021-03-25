import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { SessionActions } from '../session.types';
import { sessionLogInFailure } from './sessionLogInFailure';
import { sessionLogOutSuccess } from './sessionLogOutSuccess';

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
  };

  // Remove the cookie on server using the base api
  await HttpClient.delete('/login')
    .then(() => dispatch(sessionLogOutSuccess(emptyUser)))
    .catch((error) => {
      dispatch(
        sessionLogInFailure({
          errors: [error],
          loading: false,
        })
      );
      throw new Error(error);
    });

  return;
};
