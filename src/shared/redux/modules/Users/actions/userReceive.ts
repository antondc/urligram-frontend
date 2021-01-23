import { USER_LOAD_SUCEEDED, UsersActionsTypes, UsersState } from 'Modules/Users/users.types';

export const userReceive = (data: UsersState): UsersActionsTypes => ({
  type: USER_LOAD_SUCEEDED,
  data: {
    ...data,
  },
});
