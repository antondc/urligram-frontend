import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { UserApiResponse } from './../user.types';
import { logInRequest } from './logInRequest';
import { logInReceive } from './logInReceive';
import { logInFailure } from './logInFailure';
import { handleResponse } from 'Tools/errors';

// Request a cookie from api server using the fetch api
export const logIn = (username: string, password: string): ThunkAction<any, any, any, Action> => {
  const url = '/api/v1/login/';
  const encodedURI = isBrowser ? encodeURI(process.env.ENDPOINT_API + url) : encodeURI(process.env.ENDPOINT_API + url);

  return (dispatch: Dispatch): void => {
    dispatch(logInRequest());
    fetch(encodedURI, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: username,
        password: password,
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    })
      .then(handleResponse)
      .then((response: UserApiResponse) => dispatch(logInReceive(response.user)))
      .catch((error) => dispatch(logInFailure(error)));
  };
};
