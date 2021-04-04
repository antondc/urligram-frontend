import { bookmarksLoadByUserId } from 'Modules/Bookmarks/actions/bookmarksLoadByUserId';
import { listsLoadByUserId } from 'Modules/Lists/actions/listsLoadByUserId';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { SessionActions, SessionLogInApiRequest, SessionLogInApiResponse } from '../session.types';
import { sessionLogInFailure } from './sessionLogInFailure';
import { sessionLogInRequest } from './sessionLogInRequest';
import { sessionLogInSuccess } from './sessionLogInSuccess';

// Request a cookie from api server using the base api
export const sessionLogIn = ({
  nameOrEmail,
  password,
}: SessionLogInApiRequest): AppThunk<Promise<void>, SessionActions> => async (dispatch, getState): Promise<void> => {
  try {
    const { Session: sessionBeforeRequest } = getState();
    await dispatch(
      sessionLogInRequest({
        ...sessionBeforeRequest,
        loading: true,
      })
    );

    const { data }: SessionLogInApiResponse = await HttpClient.post('/login', { nameOrEmail, password });

    await dispatch(bookmarksLoadByUserId(data?.attributes?.id));
    await dispatch(listsLoadByUserId(data?.attributes?.id));
    await dispatch(switchLoginModal(false));
    await dispatch(
      sessionLogInSuccess({
        ...data.attributes,
        loading: false,
      })
    );
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
