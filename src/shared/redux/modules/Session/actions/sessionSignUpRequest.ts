import { SESSION_SIGN_UP_REQUEST, SessionActions, SessionState } from 'Modules/Session/session.types';

export const sessionSignUpRequest = (payload: SessionState): SessionActions => ({
  type: SESSION_SIGN_UP_REQUEST,
  payload,
});
