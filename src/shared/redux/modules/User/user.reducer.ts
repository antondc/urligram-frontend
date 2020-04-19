import { UserState, LOG_IN_STARTED, LOG_IN_SUCCESS, LOG_OUT, LOG_FAILED } from './user.types';

const initialState: UserState = {};

export const User = (state = initialState, action): UserState => {
  switch (action.type) {
    case LOG_IN_STARTED:
      return Object.assign({}, state, {
        loading: true,
      });
    case LOG_IN_SUCCESS:
      return Object.assign({}, state, {
        ...action.data,
        loading: false,
      });
    case LOG_OUT || LOG_FAILED:
      return {};
    default:
      return Object.assign({}, state);
  }
};
