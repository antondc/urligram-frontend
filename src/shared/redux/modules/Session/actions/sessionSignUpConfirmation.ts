import { switchWelcomeModal } from 'Modules/Ui/actions/switchWelcomeModal';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { SessionActions, SessionLogInApiResponse, SessionSignUpConfirmationApiRequest } from '../session.types';
import { sessionLogInFailure } from './sessionLogInFailure';
import { sessionLogInRequest } from './sessionLogInRequest';
import { sessionLogInSuccess } from './sessionLogInSuccess';

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
    await dispatch(
      sessionLogInRequest({
        ...sessionBeforeRequest,
        loading: true,
      })
    );

    const { data } = await HttpClient.post<void, SessionLogInApiResponse>('/users/sign-up-confirmation', {
      name,
      token,
    });

    await dispatch(switchWelcomeModal(true));
    await dispatch(sessionLogInSuccess(data.attributes));
  } catch (error) {
    const { Session: sessionOnError } = getState();

    await dispatch(
      sessionLogInFailure({
        ...sessionOnError,
        errors: [...sessionOnError.errors, error],
        loading: false,
      })
    );
    throw new Error(error);
  }
};
