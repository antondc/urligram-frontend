import { Dispatch } from 'redux';

import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import HttpClient from 'Services/HttpClient';
import { SessionApiResponse } from './../session.types';
import { logInFailure } from './logInFailure';
import { logInReceive } from './logInReceive';
import { logInRequest } from './logInRequest';

interface Props {
  username: string;
  password: string;
}
// Request a cookie from api server using the base api
export const logIn = ({ username, password }: Props) => async (dispatch: Dispatch): Promise<void> => {
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
