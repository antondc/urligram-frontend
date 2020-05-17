import HttpClient from 'Services/HttpClient';
import { Dispatch, Action } from 'redux';
import { logOutReceive } from './logOutReceive';
import { logInFailure } from './logInFailure';
import { ThunkAction } from 'redux-thunk';

export const logOut = (): ThunkAction<any, any, any, Action> => {
  // Remove the cookie on server using the base api
  return (dispatch: Dispatch): void => {
    HttpClient.delete('login')
      .then(() => dispatch(logOutReceive()))
      .catch((error) => dispatch(logInFailure(error)));
  };
};
