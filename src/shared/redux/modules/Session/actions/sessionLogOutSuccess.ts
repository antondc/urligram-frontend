import { SESSION_LOG_OUT_REQUEST, SessionActions, SessionState } from 'Modules/Session/session.types';

export const sessionLogOutSuccess = (payload: SessionState): SessionActions => ({
  type: SESSION_LOG_OUT_REQUEST,
  payload,
});
