import { Dispatch } from 'redux';

import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import HttpClient from 'Services/HttpClient';
import { LogInResponse, SignUpConfirmationRequest } from '../session.types';
import { logInFailure } from './logInFailure';
import { logInReceive } from './logInReceive';
import { logInRequest } from './logInRequest';

// Request a cookie from api server using the base api
export const signUpConfirmation = ({ name, token }: SignUpConfirmationRequest) => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    await dispatch(logInRequest());

    const { data }: LogInResponse = await HttpClient.post('/users/sign-up-confirmation', {
      name,
      token,
    });

    await dispatch(switchLoginModal(false));
    await dispatch(logInReceive(data.attributes));
  } catch (err) {
    await dispatch(logInFailure(err));
    throw new Error(err);
  }
};
