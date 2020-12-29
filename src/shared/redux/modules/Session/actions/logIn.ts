import { Dispatch } from 'redux';

import HttpClient from 'Services/HttpClient';
import { switchLoginModal } from '../../Ui/actions/switchLoginModal';
import { SessionApiResponse } from './../session.types';
import { logInFailure } from './logInFailure';
import { logInReceive } from './logInReceive';
import { logInRequest } from './logInRequest';

// Request a cookie from api server using the base api
export const logIn = ({ username, password }: any) => async (dispatch: Dispatch): Promise<void> => {
  try {
    await dispatch(logInRequest());
    const response = await HttpClient.post<SessionApiResponse>('/login', {
      name: username,
      password: password,
    });
    await dispatch(switchLoginModal());
    await dispatch(logInReceive(response.data.attributes));
  } catch (err) {
    await dispatch(logInFailure(err));
  }
};
