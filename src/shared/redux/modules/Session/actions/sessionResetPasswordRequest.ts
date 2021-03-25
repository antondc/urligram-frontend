import { SESSION_RESET_PASSWORD_REQUEST, SessionActions, SessionState } from 'Modules/Session/session.types';

export const sessionResetPasswordRequest = (payload: SessionState): SessionActions => ({
  type: SESSION_RESET_PASSWORD_REQUEST,
  payload,
});
