import { LOG_FAILED, SessionActionsTypes } from 'Modules/Session/session.types';

export const logInFailure = (error: Error): SessionActionsTypes => ({
  type: LOG_FAILED,
  data: {
    loading: false,
    error,
  },
});
