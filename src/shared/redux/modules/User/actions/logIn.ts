import { UserApiResponse } from './../user.types';
import { Dispatch } from 'redux';
import { logInRequest } from './logInRequest';
import { logInReceive } from './logInReceive';
import { logInFailure } from './logInFailure';
import { handleResponse } from '../../../../tools/errors';

// Request a cookie from api server using the fetch api
export const logIn = (username: string, password: string) => {
  const url: string = '/api/v1/login';
  const encodedURI = isBrowser ? encodeURI(process.env.ENDPOINT_API + url) : encodeURI(process.env.ENDPOINT_API + url);

  return (dispatch: Dispatch) => {
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
      .catch(error => dispatch(logInFailure(error)));
  };
};
