import {
  SHARED_LOAD_RECEIVED_FAILURE,
  SHARED_LOAD_RECEIVED_REQUEST,
  SHARED_LOAD_RECEIVED_SUCCESS,
  SHARED_LOAD_SENT_FAILURE,
  SHARED_LOAD_SENT_REQUEST,
  SHARED_LOAD_SENT_SUCCESS,
  SHARED_RESET,
  SHARED_VIEWED_FAILURE,
  SHARED_VIEWED_REQUEST,
  SHARED_VIEWED_SUCCESS,
  SharedActions,
  SharedState,
} from './shared.types';

export const initialState: SharedState = {
  bookmarksReceived: [],
  bookmarksSent: [],
  errors: [],
};

export const Shared = (state = initialState, action: SharedActions): SharedState => {
  switch (action.type) {
    case SHARED_RESET:
    case SHARED_LOAD_RECEIVED_REQUEST:
    case SHARED_LOAD_RECEIVED_SUCCESS:
    case SHARED_LOAD_RECEIVED_FAILURE:
    case SHARED_LOAD_SENT_REQUEST:
    case SHARED_LOAD_SENT_FAILURE:
    case SHARED_LOAD_SENT_SUCCESS:
    case SHARED_VIEWED_REQUEST:
    case SHARED_VIEWED_SUCCESS:
    case SHARED_VIEWED_FAILURE:
      return Object.assign({}, state, action.payload);
    default:
      return Object.assign({}, state);
  }
};
