import { SESSION_RESET_PASSWORD_FAILURE, SessionActions, SessionState } from 'Modules/Session/session.types';

export const sessionResetPasswordFailure = (payload: SessionState): SessionActions => ({
  type: SESSION_RESET_PASSWORD_FAILURE,
  payload,
});
