import { ListsActionsTypes, ListsState, LOAD_LISTS_STARTED, LOAD_LISTS_SUCCESS } from './lists.types';

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
      });

    default:
      return Object.assign({}, state);
  }
};
