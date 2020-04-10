import { LOG_OUT, LogActionsTypes } from 'Modules/User/user.types';

export const logOutReceive = (): LogActionsTypes => {
  return {
    type: LOG_OUT,
  };
};
