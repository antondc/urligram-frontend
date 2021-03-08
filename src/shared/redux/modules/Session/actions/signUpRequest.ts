import { SessionActionsTypes, SIGN_UP_REQUEST } from 'Modules/Session/session.types';

export const signUpRequest = (): SessionActionsTypes => ({
  type: SIGN_UP_REQUEST,
  data: {
    loading: true,
  },
});
