import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import HttpClient from 'Services/HttpClient';
import { logInFailure } from './logInFailure';
import { logOutReceive } from './logOutReceive';

export const logOut = (): ThunkAction<any, any, any, Action> => async (dispatch: Dispatch): Promise<void> => {
  // Remove the cookie on server using the base api
  try {
    await HttpClient.delete('/login')
      .then(() => dispatch(logOutReceive()))
      .catch((error) => dispatch(logInFailure(error)));
  } catch (err) {
    throw new Error(err);
  }

  return;
};
