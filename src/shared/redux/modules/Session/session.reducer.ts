import {
  LOG_FAILED,
  LOG_IN_STARTED,
  LOG_IN_SUCCESS,
  LOG_OUT,
  SessionActionsTypes,
  SessionState,
} from './session.types';

export const initialState: SessionState = {};

export const Session = (state = initialState, action: SessionActionsTypes): SessionState => {
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
    case LOG_OUT:
      return {};
    case LOG_FAILED:
      return Object.assign({}, state, {
        ...action.data,
        loading: false,
      });
    default:
      return Object.assign({}, state);
  }
};
