import {
  LOG_FAILED,
  LOG_IN_STARTED,
  LOG_IN_SUCCESS,
  LOG_OUT,
  SessionActionsTypes,
  SessionState,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from './session.types';

export const initialState: SessionState = {
  errors: [],
};

export const Session = (state = initialState, action: SessionActionsTypes): SessionState => {
  switch (action.type) {
    case LOG_IN_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });
    case LOG_IN_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...action.data,
        loading: false,
      });
    case LOG_OUT:
      return Object.assign(
        {},
        {
          errors: [...state.errors],
        }
      );
    case LOG_FAILED:
      return Object.assign(
        {},
        {
          errors: [...state.errors, action?.data?.error],
          loading: false,
        }
      );
    case SIGN_UP_REQUEST:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });
    case SIGN_UP_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...action.data,
        loading: false,
      });
    case SIGN_UP_FAILURE:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        errors: [...state.errors, action?.data?.error],
      });
    default:
      return Object.assign({}, initialState, state);
  }
};
