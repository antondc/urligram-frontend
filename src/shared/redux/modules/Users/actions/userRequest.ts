import { USER_LOAD_STARTED, UsersActionsTypes } from 'Modules/Users/users.types';

export const userRequest = (): UsersActionsTypes => ({
  type: USER_LOAD_STARTED,
  data: {
    loading: true,
  },
});
