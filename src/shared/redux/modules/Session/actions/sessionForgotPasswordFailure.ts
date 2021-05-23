import { SESSION_FORGOT_PASSWORD_FAILURE, SessionActions, SessionState } from 'Modules/Session/session.types';

export const sessionForgotPasswordFailure = (payload: SessionState): SessionActions => ({
  type: SESSION_FORGOT_PASSWORD_FAILURE,
  payload,
});
