import { loadPopularLists } from './actions/loadPopularLists';
import {
  LOAD_MOST_POPULAR_LISTS_STARTED,
  LOAD_MOST_POPULAR_LISTS_SUCCESS,
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
        PopularLists: {
          ...loadPopularLists,
          loading: true,
        },
      });
    case LOAD_MOST_POPULAR_LISTS_SUCCESS:
      return Object.assign({}, state, {
        PopularLists: {
          byKey: {
            ...state.PopularLists.byKey,
            ...action.data.PopularLists.byKey,
          },
          loading: false,
        },
      });
    default:
      return Object.assign({}, state);
  }
};
