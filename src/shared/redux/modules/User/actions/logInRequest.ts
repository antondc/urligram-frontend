import { LOG_IN_STARTED } from '../user.types';

export const logInRequest = () => {
  return {
    type: LOG_IN_STARTED,
    data: {
      loading: true,
    },
  };
};
