import { RESET_PASSWORD_FAILURE, SessionActionsTypes, SessionError } from 'Modules/Session/session.types';

export const resetPasswordFailure = (error: SessionError): SessionActionsTypes => ({
  type: RESET_PASSWORD_FAILURE,
  data: {
    loading: false,
    error,
  },
});
