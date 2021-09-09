import { SESSION_RESET_ERRORS, SessionActions } from '../session.types';

export const sessionResetErrors = (): SessionActions => ({
  type: SESSION_RESET_ERRORS,
  payload: {
    errors: [],
  },
});
