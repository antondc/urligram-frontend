import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { switchForgotPasswordModal } from '../../Ui/actions/switchForgotPasswordModal';
import { SessionActions, SessionForgotPasswordApiRequest } from '../session.types';
import { sessionForgotPasswordFailure } from './sessionForgotPasswordFailure';
import { sessionForgotPasswordRequest } from './sessionForgotPasswordRequest';
import { sessionForgotPasswordSuccess } from './sessionForgotPasswordSuccess';

export const sessionForgotPassword =
  ({ nameOrEmail }: SessionForgotPasswordApiRequest): AppThunk<Promise<void>, SessionActions> =>
  async (dispatch, getState): Promise<void> => {
    try {
      const { Session: sessionBeforeRequest } = getState();
      await dispatch(
        sessionForgotPasswordRequest({
          ...sessionBeforeRequest,
          loading: true,
        })
      );

      await HttpClient.put('/login', { nameOrEmail });
      const { Session: sessionAfterResponse } = getState();

      await dispatch(switchForgotPasswordModal(true));
      await dispatch(
        sessionForgotPasswordSuccess({
          ...sessionAfterResponse,
          loading: false,
          passwordRequested: true,
        })
      );
    } catch (error) {
      const { Session: sessionOnError } = getState();

      await dispatch(
        sessionForgotPasswordFailure({
          ...sessionOnError,
          loading: false,
          errors: [...(sessionOnError.errors || []), error],
        })
      );
      throw error;
    }
  };
