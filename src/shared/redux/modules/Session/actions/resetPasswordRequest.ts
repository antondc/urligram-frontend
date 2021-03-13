import { RESET_PASSWORD_REQUEST, SessionActionsTypes } from 'Modules/Session/session.types';

export const resetPasswordRequest = (): SessionActionsTypes => ({
  type: RESET_PASSWORD_REQUEST,
  data: {
    loading: true,
  },
});
