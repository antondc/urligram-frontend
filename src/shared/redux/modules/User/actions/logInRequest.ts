import { LOG_IN_STARTED, LogActionsTypes } from 'Modules/User/user.types';

export const logInRequest = (): LogActionsTypes => {
  return {
    type: LOG_IN_STARTED,
    data: {
      loading: true,
    },
  };
};
