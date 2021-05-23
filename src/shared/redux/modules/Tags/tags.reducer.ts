import {
  TAGS_LOAD_BY_USER_ID_FAILURE,
  TAGS_LOAD_BY_USER_ID_REQUEST,
  TAGS_LOAD_BY_USER_ID_SUCCESS,
  TAGS_LOAD_REQUEST,
  TAGS_LOAD_SUCCESS,
  TagsActions,
  TagsState,
} from './tags.types';

export const initialState: TagsState = {
  byKey: {},
  currentIds: [],
  searchIds: [],
};

export const Tags = (state = initialState, action: TagsActions): TagsState => {
  switch (action.type) {
    case TAGS_LOAD_REQUEST:
    case TAGS_LOAD_SUCCESS:
    case TAGS_LOAD_BY_USER_ID_REQUEST:
    case TAGS_LOAD_BY_USER_ID_SUCCESS:
    case TAGS_LOAD_BY_USER_ID_FAILURE:
      return Object.assign({}, state, action.payload);

    default:
      return Object.assign({}, state);
  }
};
