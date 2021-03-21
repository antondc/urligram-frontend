import {
  LIST_CREATE_FAILURE,
  LIST_CREATE_REQUEST,
  LIST_CREATE_RESET,
  LIST_CREATE_SUCCESS,
  ListsActionsTypes,
  ListsState,
  LOAD_LISTS_STARTED,
  LOAD_LISTS_SUCCESS,
} from './lists.types';

export const initialState: ListsState = {
  byKey: {},
  currentIds: [],
};

export const Lists = (state = initialState, action: ListsActionsTypes): ListsState => {
  switch (action.type) {
    case LOAD_LISTS_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
        meta: {
          ...state.meta,
          sort: undefined,
        },
      });

    case LOAD_LISTS_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        byKey: {
          ...state.byKey,
          ...action.data.byKey,
        },
        currentIds: action.data?.currentIds || state.currentIds,
        loading: false,
        meta: {
          ...state.meta,
          ...action.data.meta,
        },
      });

    case LIST_CREATE_REQUEST:
      return Object.assign({}, state, {
        ...state,
      });
    case LIST_CREATE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        byKey: {
          ...state.byKey,
          [action.data.list.id]: action.data.list,
        },
        listCreationSuccess: true,
      });
    case LIST_CREATE_FAILURE:
      return Object.assign({}, state, {
        ...state,
        listCreationSuccess: false,
        errors: [...state?.errors, action.data.error],
      });
    case LIST_CREATE_RESET:
      return Object.assign({}, state, {
        ...state,
        listCreationSuccess: undefined,
        errors: [],
      });

    default:
      return Object.assign({}, state);
  }
};
