import { USER_LOAD_REQUEST, UsersActions, UsersState } from 'Modules/Users/users.types';

export const userRequest = (payload: UsersState): UsersActions => ({
  type: USER_LOAD_REQUEST,
  payload,
});
