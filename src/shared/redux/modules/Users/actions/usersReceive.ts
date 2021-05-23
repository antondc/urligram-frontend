import { USERS_LOAD_SUCCEED, UsersActions, UsersState } from 'Modules/Users/users.types';

export const usersReceive = (payload: UsersState): UsersActions => ({
  type: USERS_LOAD_SUCCEED,
  payload,
});
