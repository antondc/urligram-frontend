import { SESSION_FORGOT_PASSWORD_SUCCESS, SessionActions, SessionState } from 'Modules/Session/session.types';

export const sessionForgotPasswordSuccess = (payload: SessionState): SessionActions => ({
  type: SESSION_FORGOT_PASSWORD_SUCCESS,
  payload,
});
