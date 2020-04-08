import { LOG_OUT, LogActionsTypes } from '../user.types';

export const logOutReceive = (): LogActionsTypes => {
  return {
    type: LOG_OUT,
  };
};
