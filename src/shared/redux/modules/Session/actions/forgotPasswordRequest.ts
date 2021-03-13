import { FORGOT_PASSWORD_REQUEST, SessionActionsTypes } from 'Modules/Session/session.types';

export const forgotPasswordRequest = (): SessionActionsTypes => ({
  type: FORGOT_PASSWORD_REQUEST,
});
