import { LOG_FAILED, SessionActionsTypes, SessionError } from 'Modules/Session/session.types';

export const logInFailure = (error: SessionError): SessionActionsTypes => ({
  type: LOG_FAILED,
  data: {
    loading: false,
    error,
  },
});
