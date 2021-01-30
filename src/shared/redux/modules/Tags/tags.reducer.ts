import { LOAD_TAGS_STARTED, LOAD_TAGS_SUCCESS, TagsActionsTypes, TagsState } from './tags.types';

export const initialState: TagsState = {
  byKey: {},
  currentIds: [],
};

export const Tags = (state = initialState, action: TagsActionsTypes): TagsState => {
  switch (action.type) {
    case LOAD_TAGS_SUCCESS:
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
