import { switchResetPasswordModal } from 'Modules/Ui/actions/switchResetPasswordModal';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { SessionActions, SessionResetPasswordApiRequest, SessionResetPasswordApiResponse } from '../session.types';
import { sessionLogInSuccess } from './sessionLogInSuccess';
import { sessionResetPasswordFailure } from './sessionResetPasswordFailure';
import { sessionResetPasswordRequest } from './sessionResetPasswordRequest';
import { sessionResetPasswordSuccess } from './sessionResetPasswordSuccess';

export const sessionResetPassword = ({
  name,
  token,
  password,
  passwordRepeated,
}: SessionResetPasswordApiRequest): AppThunk<Promise<void>, SessionActions> => async (
  dispatch,
  getState
): Promise<void> => {
  const { Session: sessionBeforeRequest } = getState();
  try {
    await dispatch(
      sessionResetPasswordRequest({
        ...sessionBeforeRequest,
        loading: true,
      })
    );

    const { data }: SessionResetPasswordApiResponse = await HttpClient.patch('/login', {
      name,
      token,
      password,
      passwordRepeated,
    });

    await dispatch(switchResetPasswordModal(true));
    const { Session: sessionAfterResponse } = getState();

    await dispatch(
      sessionResetPasswordSuccess({
        ...sessionAfterResponse,
        loading: false,
        passwordReset: true,
      })
    );
    await dispatch(sessionLogInSuccess(data?.attributes));
  } catch (error) {
    const { Session: sessionOnError } = getState();

    await dispatch(
      sessionResetPasswordFailure({
        ...sessionOnError,
        errors: [...sessionOnError.errors, error],
        loading: false,
      })
    );
    throw new Error(error);
  }
};
