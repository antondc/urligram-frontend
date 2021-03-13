import { Dispatch } from 'redux';

import { switchResetPasswordModal } from 'Modules/Ui/actions/switchResetPasswordModal';
import HttpClient from 'Services/HttpClient';
import { ResetPasswordRequest, ResetPasswordResponse } from './../session.types';
import { logInReceive } from './logInReceive';
import { resetPasswordFailure } from './resetPasswordFailure';
import { resetPasswordRequest } from './resetPasswordRequest';
import { resetPasswordSuccess } from './resetPasswordSuccess';

export const resetPassword = ({ name, token, password, passwordRepeated }: ResetPasswordRequest) => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    await dispatch(resetPasswordRequest());

    const { data }: ResetPasswordResponse = await HttpClient.patch('/login', {
      name,
      token,
      password,
      passwordRepeated,
    });

    await dispatch(switchResetPasswordModal(true));
    await dispatch(resetPasswordSuccess());
    await dispatch(logInReceive(data?.attributes));
  } catch (err) {
    await dispatch(resetPasswordFailure(err));
    throw new Error(err);
  }
};
