import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { userLoad } from 'Modules/Users/actions/userLoad';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import {
  SESSION_LOG_IN_FAILURE,
  SESSION_LOG_IN_REQUEST,
  SESSION_LOG_IN_SUCCESS,
  SessionActions,
  SessionLogInApiRequest,
  SessionLogInApiResponse,
} from '../session.types';

// Request a cookie from api server using the base api
export const sessionLogIn =
  ({ nameOrEmail, password }: SessionLogInApiRequest): AppThunk<Promise<void>, SessionActions> =>
  async (dispatch, getState): Promise<void> => {
    try {
      const { Session: sessionBeforeRequest } = getState();
      await dispatch({
        type: SESSION_LOG_IN_REQUEST,
        payload: {
          ...sessionBeforeRequest,
          loading: true,
        },
      });

      const { data }: SessionLogInApiResponse = await HttpClient.post('/login', { nameOrEmail, password });

      await dispatch(userLoad(data?.attributes?.id));
      await dispatch(switchLoginModal(false));

      await dispatch({
        type: SESSION_LOG_IN_SUCCESS,
        payload: {
          ...data.attributes,
          loading: false,
        },
      });

      return;
    } catch (error) {
      const { Session: sessionOnError } = getState();

      await dispatch({
        type: SESSION_LOG_IN_FAILURE,
        payload: {
          ...sessionOnError,
          errors: [...(sessionOnError.errors || []), error],
          loading: false,
        },
      });
      throw error;
    }
  };
