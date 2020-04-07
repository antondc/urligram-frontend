import { LOG_IN_SUCCESS } from '../user.types';

export const logInReceive = user => {
  return {
    type: LOG_IN_SUCCESS,
    data: {
      ...user,
    },
  };
};
