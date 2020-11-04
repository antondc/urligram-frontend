import { LOG_FAILED,LOG_IN_STARTED, LOG_IN_SUCCESS, LOG_OUT, SessionState } from './session.types';

const initialState: SessionState = {};

export const Session = (state = initialState, action): SessionState => {
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
