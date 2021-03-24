import { USERS_LOAD_REQUEST, UsersActions, UsersState } from 'Modules/Users/users.types';

export const usersRequest = (payload: UsersState): UsersActions => ({
  type: USERS_LOAD_REQUEST,
  payload,
});
