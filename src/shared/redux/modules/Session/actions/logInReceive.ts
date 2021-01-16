import { LOG_IN_SUCCESS, SessionActionsTypes, SessionState } from 'Modules/Session/session.types';

export const logInReceive = (session: SessionState): SessionActionsTypes => ({
  type: LOG_IN_SUCCESS,
  data: {
    ...session,
  },
});
