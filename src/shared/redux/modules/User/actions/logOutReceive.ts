import { LOG_OUT } from '../user.types';

export const logOutReceive = () => {
  return {
    type: LOG_OUT,
  };
};
