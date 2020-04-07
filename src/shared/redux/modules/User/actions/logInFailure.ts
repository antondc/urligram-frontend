import { LOG_FAILED } from '../user.types';

export const logInFailure = (error: any) => {
  // TODO: type error
  return {
    type: LOG_FAILED,
    data: {
      logged: false,
      message: error,
    },
  };
};
