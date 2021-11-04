import { switchResetPasswordModal } from 'Modules/Ui/actions/switchResetPasswordModal';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import {
  SESSION_LOG_IN_SUCCESS,
  SESSION_RESET_PASSWORD_FAILURE,
  SESSION_RESET_PASSWORD_REQUEST,
  SESSION_RESET_PASSWORD_SUCCESS,
  SessionActions,
  SessionResetPasswordApiRequest,
  SessionResetPasswordApiResponse,
} from '../session.types';

export const sessionResetPassword =
  ({
    name,
    token,
    password,
    passwordRepeated,
  }: SessionResetPasswordApiRequest): AppThunk<Promise<void>, SessionActions> =>
  async (dispatch, getState): Promise<void> => {
    const { Session: sessionBeforeRequest } = getState();
    try {
      await dispatch({
        type: SESSION_RESET_PASSWORD_REQUEST,
        payload: { ...sessionBeforeRequest, loading: true },
      });

      const { data }: SessionResetPasswordApiResponse = await HttpClient.patch('/login', {
        name,
        token,
        password,
        passwordRepeated,
      });

      await dispatch(switchResetPasswordModal(true));
      const { Session: sessionAfterResponse } = getState();

      await dispatch({
        type: SESSION_RESET_PASSWORD_SUCCESS,
        payload: {
          ...sessionAfterResponse,
          loading: false,
          passwordReset: true,
        },
      });

      await dispatch({
        type: SESSION_LOG_IN_SUCCESS,
        payload: {
          ...data?.attributes,
          loading: false,
        },
      });
    } catch (error) {
      const { Session: sessionOnError } = getState();

      await dispatch({
        type: SESSION_RESET_PASSWORD_FAILURE,
        payload: {
          ...sessionOnError,
          errors: [...(sessionOnError.errors || []), error],
          loading: false,
        },
      });
      throw error;
    }
  };
