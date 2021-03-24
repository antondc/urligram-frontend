import {
  LIST_CREATE_FAILURE,
  LIST_CREATE_REQUEST,
  LIST_CREATE_RESET,
  LIST_CREATE_SUCCESS,
  LISTS_LOAD_REQUEST,
  LISTS_LOAD_SUCCESS,
  ListsActions,
  ListsState,
} from './lists.types';

export const initialState: ListsState = {
  byKey: {},
  currentIds: [],
};

export const Lists = (state = initialState, action: ListsActions): ListsState => {
  switch (action.type) {
    case LISTS_LOAD_REQUEST:
    case LISTS_LOAD_SUCCESS:
    case LIST_CREATE_REQUEST:
    case LIST_CREATE_SUCCESS:
    case LIST_CREATE_FAILURE:
    case LIST_CREATE_RESET:
      return Object.assign({}, state, action.payload);

    default:
      return Object.assign({}, state);
  }
};
