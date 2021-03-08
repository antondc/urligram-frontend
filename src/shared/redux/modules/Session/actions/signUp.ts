import { Dispatch } from 'redux';

import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import HttpClient from 'Services/HttpClient';
import { SignUpRequest, SignUpResponse } from './../session.types';
import { signUpFailure } from './signUpFailure';
import { signUpRequest } from './signUpRequest';
import { signUpSuccess } from './signUpSuccess';

export const signUp = (userData: SignUpRequest) => async (dispatch: Dispatch): Promise<void> => {
  try {
    await dispatch(signUpRequest());

    const { data }: SignUpResponse = await HttpClient.post('/users', userData);

    await dispatch(switchLoginModal(false));
    await dispatch(signUpSuccess(data.attributes));
  } catch (err) {
    await dispatch(signUpFailure(err));
    throw new Error(err);
  }
};
