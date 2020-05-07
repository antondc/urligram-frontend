import Http from 'Services/Http';
import { Dispatch, Action } from 'redux';
import { logOutReceive } from './logOutReceive';
import { logInFailure } from './logInFailure';
import { ThunkAction } from 'redux-thunk';

export const logOut = (): ThunkAction<any, any, any, Action> => {
  // Remove the cookie on server using the base api
  return (dispatch: Dispatch): void => {
    Http.delete('login')
      .then(() => dispatch(logOutReceive()))
      .catch((error) => dispatch(logInFailure(error)));
  };
};
