import { SessionState } from 'Modules/Session/session.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { userUpdateDetails } from '../../Users/actions/userUpdateDetails';
import {
  SESSION_UPDATE_DETAILS_FAILURE,
  SESSION_UPDATE_DETAILS_REQUEST,
  SESSION_UPDATE_DETAILS_SUCCESS,
  SessionActions,
} from '../session.types';

export const sessionUpdateDetails =
  ({ name, email, statement, location, image }: Partial<SessionState>): AppThunk<Promise<void>, SessionActions> =>
  async (dispatch, getState): Promise<void> => {
    try {
      const { Session: sessionBeforeRequest } = getState();
      await dispatch({
        type: SESSION_UPDATE_DETAILS_REQUEST,
        payload: {
          ...sessionBeforeRequest,
          loading: true,
        },
      });

      const { data: userData } = await HttpClient.put('/users/me', {
        name,
        email,
        statement,
        location,
        image: image?.original,
      });
      const { Session: sessionAfterResponse } = getState();

      await dispatch({
        type: SESSION_UPDATE_DETAILS_SUCCESS,
        payload: {
          ...sessionAfterResponse,
          ...userData?.attributes,
          loading: false,
        },
      });
      dispatch(userUpdateDetails(userData?.attributes));
    } catch (error) {
      const { Session: sessionOnError } = getState();

      await dispatch({
        type: SESSION_UPDATE_DETAILS_FAILURE,
        payload: {
          ...sessionOnError,
          loading: false,
          errors: [...(sessionOnError.errors || []), error],
        },
      });
      throw error;
    }
  };
