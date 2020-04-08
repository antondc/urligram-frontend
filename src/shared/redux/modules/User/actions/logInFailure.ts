import { LOG_FAILED, LogActionsTypes } from '../user.types';

export const logInFailure = (error): LogActionsTypes => {
  return {
    type: LOG_FAILED,
    data: {
      loading: false,
      error: error,
    },
  };
};
