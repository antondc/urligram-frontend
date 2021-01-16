import { LOG_OUT, SessionActionsTypes } from 'Modules/Session/session.types';

export const logOutReceive = (): SessionActionsTypes => ({
  type: LOG_OUT,
});
