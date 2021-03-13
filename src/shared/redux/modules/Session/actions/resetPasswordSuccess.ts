import { RESET_PASSWORD_SUCCESS, SessionActionsTypes } from 'Modules/Session/session.types';

export const resetPasswordSuccess = (): SessionActionsTypes => ({
  type: RESET_PASSWORD_SUCCESS,
  data: {
    loading: false,
  },
});
