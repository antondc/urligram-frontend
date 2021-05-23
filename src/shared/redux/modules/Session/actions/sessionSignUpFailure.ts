import { SESSION_SIGN_UP_FAILURE, SessionActions, SessionState } from 'Modules/Session/session.types';

export const sessionSignUpFailure = (payload: SessionState): SessionActions => ({
  type: SESSION_SIGN_UP_FAILURE,
  payload,
});
