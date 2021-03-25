import { SESSION_SIGN_UP_SUCCESS, SessionActions, SessionState } from 'Modules/Session/session.types';

export const sessionSignUpSuccess = (payload: SessionState): SessionActions => ({
  type: SESSION_SIGN_UP_SUCCESS,
  payload,
});
