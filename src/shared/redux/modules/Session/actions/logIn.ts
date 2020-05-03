import { Dispatch } from 'redux';
import { logInRequest } from './logInRequest';
import { logInReceive } from './logInReceive';
import { logInFailure } from './logInFailure';
import { apiBase } from 'Services/Api';
import { SessionApiResponse } from './../session.types';
import { switchLoginModal } from '../../Ui/actions/switchLoginModal';

// Request a cookie from api server using the base api
export const logIn = ({ username, password }: any) => async (dispatch: Dispatch): Promise<void> => {
  try {
    await dispatch(logInRequest());
    const response = await apiBase.post<SessionApiResponse>('login', {
      name: username,
      password: password,
    });
    await dispatch(switchLoginModal());
    await dispatch(logInReceive(response.data.user));
  } catch (err) {
    await dispatch(logInFailure(err));
  }
};
