import { LOAD_USERS_STARTED, LOAD_USERS_SUCEEDED, UsersActionsTypes, UsersState } from './users.types';

export const initialState: UsersState = {
  byKey: {},
};

export const Users = (state = initialState, action: UsersActionsTypes): UsersState => {
  switch (action.type) {
    case LOAD_USERS_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });

    case LOAD_USERS_SUCEEDED:
      return Object.assign({}, state, {
        ...state,
        byKey: {
          ...state.byKey,
          ...action.data.byKey,
        },
        currentIds: action.data.currentIds,
        loading: false,
      });

    default:
      return Object.assign({}, state);
  }
};
