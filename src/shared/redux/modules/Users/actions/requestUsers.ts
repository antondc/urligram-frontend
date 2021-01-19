import { LOAD_USERS_STARTED, UsersActionsTypes } from 'Modules/Users/users.types';

export const requestUsers = (): UsersActionsTypes => ({
  type: LOAD_USERS_STARTED,
  data: {
    loading: true,
  },
});
