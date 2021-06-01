import { switchWelcomeModal } from 'Modules/Ui/actions/switchWelcomeModal';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import {
  SESSION_LOG_IN_FAILURE,
  SESSION_LOG_IN_REQUEST,
  SESSION_LOG_IN_SUCCESS,
  SessionActions,
  SessionLogInApiResponse,
  SessionSignUpConfirmationApiRequest,
} from '../session.types';

// Request a cookie from api server using the base api
export const sessionSignUpConfirmation = ({
  name,
  token,
}: SessionSignUpConfirmationApiRequest): AppThunk<Promise<void>, SessionActions> => async (
  dispatch,
  getState
): Promise<void> => {
  try {
    const { Session: sessionBeforeRequest } = getState();
    await dispatch({
      type: SESSION_LOG_IN_REQUEST,
      payload: {
        ...sessionBeforeRequest,
        loading: true,
      },
    });

    const { data } = await HttpClient.post<void, SessionLogInApiResponse>('/users/sign-up-confirmation', {
      name,
      token,
    });

    await dispatch(switchWelcomeModal(true));
    await dispatch({
      type: SESSION_LOG_IN_SUCCESS,
      payload: {
        ...data.attributes,
        loading: false,
      },
    });
  } catch (error) {
    const { Session: sessionOnError } = getState();

    await dispatch({
      type: SESSION_LOG_IN_FAILURE,
      payload: {
        ...sessionOnError,
        errors: [...sessionOnError.errors, error],
        loading: false,
      },
    });
    throw error;
  }
};
