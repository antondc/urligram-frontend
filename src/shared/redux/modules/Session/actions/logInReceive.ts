import { SessionState, LOG_IN_SUCCESS, LogActionsTypes } from 'Modules/Session/session.types';

export const logInReceive = (session: SessionState): LogActionsTypes => {
  return {
    type: LOG_IN_SUCCESS,
    data: {
      ...session,
    },
  };
};
