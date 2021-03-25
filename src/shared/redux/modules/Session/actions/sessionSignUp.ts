import { switchSignUpModal } from 'Modules/Ui/actions/switchSignUpModal';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { SessionActions, SessionSignUpApiRequest, SessionSignUpApiResponse } from '../session.types';
import { sessionSignUpFailure } from './sessionSignUpFailure';
import { sessionSignUpRequest } from './sessionSignUpRequest';
import { sessionSignUpSuccess } from './sessionSignUpSuccess';

export const sessionSignUp = (userData: SessionSignUpApiRequest): AppThunk<Promise<void>, SessionActions> => async (
  dispatch,
  getState
): Promise<void> => {
  try {
    const { Session: sessionBeforeRequest } = getState();
    await dispatch(
      sessionSignUpRequest({
        ...sessionBeforeRequest,
        loading: true,
      })
    );

    const { data }: SessionSignUpApiResponse = await HttpClient.post('/users', userData);

    await dispatch(switchSignUpModal(true));
    await dispatch(sessionSignUpSuccess(data.attributes));
  } catch (error) {
    const { Session: sessiononError } = getState();

    await dispatch(
      sessionSignUpFailure({
        ...sessiononError,
        errors: [...sessiononError.errors, error],
        loading: false,
      })
    );
    throw new Error(error);
  }
};
