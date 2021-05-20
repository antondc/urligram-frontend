import { AppThunk } from '../../..';
import { SESSION_ERROR_CLEAR, SessionActions } from '../session.types';

export const sessionErrorClear = (): AppThunk<Promise<void>, SessionActions> => async (
  dispatch,
  getState
): Promise<void> => {
  const { Session: sessionBeforeRequest } = getState();

  await dispatch({
    type: SESSION_ERROR_CLEAR,
    payload: {
      ...sessionBeforeRequest,
      errors: [],
    },
  });
};
