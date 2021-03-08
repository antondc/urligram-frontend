import { SessionActionsTypes, SessionState, SIGN_UP_SUCCESS } from 'Modules/Session/session.types';

export const signUpSuccess = (data: SessionState): SessionActionsTypes => ({
  type: SIGN_UP_SUCCESS,
  data,
});
