import { USER_LOAD_SUCCEED, UsersActions, UsersState } from 'Modules/Users/users.types';

export const userReceive = (payload: UsersState): UsersActions => ({
  type: USER_LOAD_SUCCEED,
  payload,
});
