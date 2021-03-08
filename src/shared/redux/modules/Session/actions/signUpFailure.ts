import { SessionActionsTypes, SIGN_UP_FAILURE } from 'Modules/Session/session.types';

export const signUpFailure = (error: Error): SessionActionsTypes => ({
  type: SIGN_UP_FAILURE,
  data: {
    loading: false,
    error,
  },
});
