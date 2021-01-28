import {
  LOAD_MOST_POPULAR_LISTS_STARTED,
  LOAD_MOST_POPULAR_LISTS_SUCCESS,
  SECTIONS_NEW_LISTS_RECEIVE,
  SECTIONS_NEW_LISTS_REQUEST,
  SectionsActionsTypes,
  SectionsState,
} from './sections.types';

export const initialState: SectionsState = {
  PopularLists: {
    byKey: {},
    loading: false,
  },
};

export const Sections = (state = initialState, action: SectionsActionsTypes): SectionsState => {
  switch (action.type) {
    case LOAD_MOST_POPULAR_LISTS_STARTED:
      return Object.assign({}, state, {
        ...state,
        PopularLists: {
          loading: true,
        },
      });
    case LOAD_MOST_POPULAR_LISTS_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        PopularLists: {
          currentIds: action.data.PopularLists?.currentIds,
          loading: false,
        },
      });
    case SECTIONS_NEW_LISTS_REQUEST:
      return Object.assign({}, state, {
        NewLists: {
          loading: true,
        },
      });
    case SECTIONS_NEW_LISTS_RECEIVE:
      return Object.assign({}, state, {
        ...state,
        NewLists: {
          currentIds: action.data.NewLists?.currentIds,
          loading: false,
        },
      });
    default:
      return Object.assign({}, state);
  }
};
