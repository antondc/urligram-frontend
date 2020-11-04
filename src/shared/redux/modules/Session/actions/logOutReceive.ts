import { LOG_OUT, LogActionsTypes } from 'Modules/Session/session.types';

export const logOutReceive = (): LogActionsTypes => ({
  type: LOG_OUT,
});
