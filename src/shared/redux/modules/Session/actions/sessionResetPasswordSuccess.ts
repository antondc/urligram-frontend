import { SESSION_RESET_PASSWORD_SUCCESS, SessionActions, SessionState } from 'Modules/Session/session.types';

export const sessionResetPasswordSuccess = (payload: SessionState): SessionActions => ({
  type: SESSION_RESET_PASSWORD_SUCCESS,
  payload,
});
