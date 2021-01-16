import { LOG_IN_STARTED, SessionActionsTypes } from 'Modules/Session/session.types';

export const logInRequest = (): SessionActionsTypes => ({
  type: LOG_IN_STARTED,
  data: {
    loading: true,
  },
});
