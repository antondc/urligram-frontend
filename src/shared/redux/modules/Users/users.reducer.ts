import {
  USER_DELETE_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCEED,
  USER_FOLLOW_CREATE_FAILURE,
  USER_FOLLOW_CREATE_REQUEST,
  USER_FOLLOW_CREATE_SUCCEED,
  USER_FOLLOW_DELETE_FAILURE,
  USER_FOLLOW_DELETE_REQUEST,
  USER_FOLLOW_DELETE_SUCCEED,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCEED,
  USER_UPDATE_DETAILS,
  USERS_LOAD_REQUEST,
  USERS_LOAD_SUCCEED,
  UsersActions,
  UsersState,
} from './users.types';

const initialState: UsersState = {
  byKey: {},
};

export const Users = (state = initialState, action: UsersActions): UsersState => {
  switch (action.type) {
    case USER_LOAD_REQUEST:
    case USER_LOAD_SUCCEED:
    case USERS_LOAD_REQUEST:
    case USERS_LOAD_SUCCEED:
    case USER_FOLLOW_CREATE_REQUEST:
    case USER_FOLLOW_CREATE_SUCCEED:
    case USER_FOLLOW_CREATE_FAILURE:
    case USER_FOLLOW_DELETE_REQUEST:
    case USER_FOLLOW_DELETE_SUCCEED:
    case USER_FOLLOW_DELETE_FAILURE:
    case USER_DELETE_REQUEST:
    case USER_DELETE_SUCCEED:
    case USER_DELETE_FAILURE:
    case USER_FOLLOW_DELETE_SUCCEED:
    case USER_FOLLOW_DELETE_FAILURE:
    case USER_UPDATE_DETAILS:
      return Object.assign({}, state, action.payload);

    default:
      return Object.assign({}, state);
  }
};
