import { SessionActionsTypes, SessionError, SIGN_UP_FAILURE } from 'Modules/Session/session.types';

export const signUpFailure = (error: SessionError): SessionActionsTypes => ({
  type: SIGN_UP_FAILURE,
  data: {
    loading: false,
    error,
  },
});
