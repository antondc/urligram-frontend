import { LOG_IN_STARTED, LOG_IN_SUCCESS, LOG_OUT, LOG_FAILED } from './user.types';

export const User = (state = '', action) => {
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
      return state;
  }
};
