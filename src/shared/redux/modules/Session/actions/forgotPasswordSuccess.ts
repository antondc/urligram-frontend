import { FORGOT_PASSWORD_SUCCESS, SessionActionsTypes } from 'Modules/Session/session.types';

export const forgotPasswordSuccess = (): SessionActionsTypes => ({
  type: FORGOT_PASSWORD_SUCCESS,
});
