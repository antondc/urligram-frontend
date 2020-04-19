import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { UserApiResponse } from './../user.types';
import { logInRequest } from './logInRequest';
import { logInReceive } from './logInReceive';
import { logInFailure } from './logInFailure';
import { AxiosResponse } from 'axios';
import { apiBase } from 'Services/Api';

// Request a cookie from api server using the base api
export const logIn = (username: string, password: string): ThunkAction<any, any, any, Action> => {
  return (dispatch: Dispatch): void => {
    dispatch(logInRequest());
    apiBase
      .post('login', {
        name: username,
        password: password,
      })
      .then((response: AxiosResponse<UserApiResponse>) => {
        dispatch(logInReceive(response.data.user));
      })
      .catch((error) => dispatch(logInFailure(error)));
  };
};
