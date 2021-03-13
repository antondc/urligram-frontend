import { Dispatch } from 'redux';

import HttpClient from 'Services/HttpClient';
import { switchForgotPasswordModal } from '../../Ui/actions/switchForgotPasswordModal';
import { ForgotPasswordRequest } from './../session.types';
import { forgotPasswordFailure } from './forgotPasswordFailure';
import { forgotPasswordRequest } from './forgotPasswordRequest';
import { forgotPasswordSuccess } from './forgotPasswordSuccess';

export const forgotPassword = ({ nameOrEmail }: ForgotPasswordRequest) => async (dispatch: Dispatch): Promise<void> => {
  try {
    await dispatch(forgotPasswordRequest());

    await HttpClient.put('/login', {
      nameOrEmail,
    });

    await dispatch(switchForgotPasswordModal(true));
    await dispatch(forgotPasswordSuccess());
  } catch (err) {
    await dispatch(forgotPasswordFailure(err));
    throw new Error(err);
  }
};
