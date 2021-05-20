import { BROWSER_FIREFOX } from 'Root/src/shared/constants';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { identifyBrowser } from '../../../../tools/utils/browser/identifyBrowser';
import {
  SESSION_LOG_IN_FAILURE,
  SESSION_LOG_IN_REQUEST,
  SESSION_LOG_IN_SUCCESS,
  SessionActions,
  SessionLogInApiRequest,
  SessionLogInApiResponse,
} from '../session.types';

// Request a cookie from api server using the base api
export const sessionLogIn = ({
  nameOrEmail,
  password,
}: SessionLogInApiRequest): AppThunk<Promise<void>, SessionActions> => async (dispatch, getState): Promise<void> => {
  try {
    const userAgent = identifyBrowser();

    const { Session: sessionBeforeRequest } = getState();
    await dispatch({
      type: SESSION_LOG_IN_REQUEST,
      payload: {
        ...sessionBeforeRequest,
        loading: true,
      },
    });

    const { data }: SessionLogInApiResponse = await HttpClient.post('/login', { nameOrEmail, password });

    if (userAgent === BROWSER_FIREFOX) {
      await browser.storage.local.set({ Session: data });
    }

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
