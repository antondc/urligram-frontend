import { LOG_IN_STARTED, LogActionsTypes } from '../user.types';

export const logInRequest = (): LogActionsTypes => {
  return {
    type: LOG_IN_STARTED,
    data: {
      loading: true,
    },
  };
};
