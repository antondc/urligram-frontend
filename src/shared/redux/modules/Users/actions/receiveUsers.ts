import { LOAD_USERS_SUCEEDED, UsersActionsTypes, UsersState } from 'Modules/Users/users.types';

export const receiveUsers = (data: UsersState): UsersActionsTypes => ({
  type: LOAD_USERS_SUCEEDED,
  data: {
    ...data,
  },
});
