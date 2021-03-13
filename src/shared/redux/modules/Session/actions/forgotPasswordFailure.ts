import { FORGOT_PASSWORD_FAILURE, SessionActionsTypes, SessionError } from 'Modules/Session/session.types';

export const forgotPasswordFailure = (error: SessionError): SessionActionsTypes => ({
  type: FORGOT_PASSWORD_FAILURE,
  data: {
    error,
  },
});
