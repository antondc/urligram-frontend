import { LOG_IN_SUCCESS, LogActionsTypes,SessionState } from 'Modules/Session/session.types';

export const logInReceive = (session: SessionState): LogActionsTypes => ({
  type: LOG_IN_SUCCESS,
  data: {
    ...session,
  },
});
