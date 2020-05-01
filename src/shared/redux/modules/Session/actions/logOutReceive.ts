import { LOG_OUT, LogActionsTypes } from 'Modules/Session/session.types';

export const logOutReceive = (): LogActionsTypes => {
  return {
    type: LOG_OUT,
  };
};
