import { SESSION_LOG_IN_SUCCESS, SessionActions, SessionState } from 'Modules/Session/session.types';

export const sessionLogInSuccess = (payload: SessionState): SessionActions => ({
  type: SESSION_LOG_IN_SUCCESS,
  payload,
});
