import { SESSION_LOG_IN_FAILURE, SessionActions, SessionState } from 'Modules/Session/session.types';

export const sessionLogInFailure = (payload: SessionState): SessionActions => ({
  type: SESSION_LOG_IN_FAILURE,
  payload,
});
