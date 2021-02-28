import { LOAD_TAGS_STARTED, LOAD_TAGS_SUCCESS, TagsActionsTypes, TagsState } from './tags.types';

export const initialState: TagsState = {
  byKey: {},
  currentIds: [],
  searchIds: [],
};

export const Tags = (state = initialState, action: TagsActionsTypes): TagsState => {
  switch (action.type) {
    case LOAD_TAGS_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });
    case LOAD_TAGS_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        byKey: {
          ...state.byKey,
          ...action.data.byKey,
        },
        currentIds: action.data?.currentIds || state.currentIds,
        searchIds: action.data?.searchIds || state.searchIds,
        loading: false,
      });

    default:
      return Object.assign({}, state);
  }
};
