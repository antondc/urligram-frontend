import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import HttpClient from 'Services/HttpClient';
import { logInFailure } from './logInFailure';
import { logOutReceive } from './logOutReceive';

export const logOut = (): ThunkAction<any, any, any, Action> => async (dispatch: Dispatch): Promise<void> => {
  // Remove the cookie on server using the base api
  await HttpClient.delete('/login')
    .then(() => dispatch(logOutReceive()))
    .catch((error) => dispatch(logInFailure(error)));

  await window.location.reload();

  return;
};
