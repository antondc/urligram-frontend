import { Dispatch } from 'redux';
import { logOutReceive } from './logOutReceive';
import { logInFailure } from './logInFailure';

export const logOut = () => {
  // Remove the cookie on server using the fetch api
  const encodedURI = encodeURI(process.env.ENDPOINT_API + '/api/v1/login');

  return (dispatch: Dispatch) => {
    fetch(encodedURI, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(() => dispatch(logOutReceive()))
      .catch(error => dispatch(logInFailure(error)));
  };
};
