import { LOG_FAILED, LogActionsTypes } from 'Modules/User/user.types';

export const logInFailure = (error): LogActionsTypes => {
  return {
    type: LOG_FAILED,
    data: {
      loading: false,
      error: error,
    },
  };
};
