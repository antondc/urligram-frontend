import { SESSION_LOG_IN_REQUEST, SessionActions, SessionState } from 'Modules/Session/session.types';

export const sessionLogInRequest = (payload: SessionState): SessionActions => ({
  type: SESSION_LOG_IN_REQUEST,
  payload,
});
