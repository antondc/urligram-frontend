import { UserState, LOG_IN_SUCCESS, LogActionsTypes } from '../user.types';

export const logInReceive = (user: UserState): LogActionsTypes => {
  return {
    type: LOG_IN_SUCCESS,
    data: {
      ...user,
    },
  };
};
