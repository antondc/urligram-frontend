import { LOG_FAILED, LogActionsTypes } from 'Modules/Session/session.types';

export const logInFailure = (error): LogActionsTypes => ({
  type: LOG_FAILED,
  data: {
    loading: false,
    error: error,
  },
});
