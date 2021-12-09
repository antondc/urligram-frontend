import { switchSignUpModal } from 'Modules/Ui/actions/switchSignUpModal';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import {
  SESSION_SIGN_UP_FAILURE,
  SESSION_SIGN_UP_REQUEST,
  SESSION_SIGN_UP_SUCCESS,
  SessionActions,
  SessionSignUpApiRequest,
  SessionSignUpApiResponse,
} from '../session.types';

export const sessionSignUp =
  (userData: SessionSignUpApiRequest): AppThunk<Promise<void>, SessionActions> =>
  async (dispatch, getState): Promise<void> => {
    try {
      const { Session: sessionBeforeRequest } = getState();
      await dispatch({
        type: SESSION_SIGN_UP_REQUEST,
        payload: {
          ...sessionBeforeRequest,
          loading: true,
        },
      });

      await HttpClient.post('/users', userData);

      await dispatch(switchSignUpModal(true));
      await dispatch({
        type: SESSION_SIGN_UP_SUCCESS,
        payload: {
          loading: false,
        },
      });
    } catch (error) {
      const { Session: sessionOnError } = getState();

      await dispatch({
        type: SESSION_SIGN_UP_FAILURE,
        payload: {
          ...sessionOnError,
          errors: [...(sessionOnError.errors || []), error],
          loading: false,
        },
      });

      throw error;
    }
  };
