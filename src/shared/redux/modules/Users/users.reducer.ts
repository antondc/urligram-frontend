import {
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCEED,
  USERS_LOAD_REQUEST,
  USERS_LOAD_SUCCEED,
  UsersActions,
  UsersState,
} from './users.types';

export const initialState: UsersState = {
  byKey: {},
};

export const Users = (state = initialState, action: UsersActions): UsersState => {
  switch (action.type) {
    case USER_LOAD_REQUEST:
    case USER_LOAD_SUCCEED:
    case USERS_LOAD_REQUEST:
    case USERS_LOAD_SUCCEED:
      return Object.assign({}, state, action.payload);

    default:
      return Object.assign({}, state);
  }
};
