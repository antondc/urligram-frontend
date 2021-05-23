import { SESSION_FORGOT_PASSWORD_REQUEST, SessionActions, SessionState } from 'Modules/Session/session.types';

export const sessionForgotPasswordRequest = (payload: SessionState): SessionActions => ({
  type: SESSION_FORGOT_PASSWORD_REQUEST,
  payload,
});
