import { mergeDeep } from 'Root/src/shared/tools/utils/object/mergeDeep';
import {
  BOOKMARK_CREATE_FAILURE,
  BOOKMARK_CREATE_REQUEST,
  BOOKMARK_CREATE_SUCCESS,
  BOOKMARK_UPDATE_FAILURE,
  BOOKMARK_UPDATE_REQUEST,
  BOOKMARK_UPDATE_SUCCESS,
  BOOKMARK_UPDATE_VOTE_START,
  BOOKMARK_UPDATE_VOTE_SUCCESS,
  BOOKMARKS_LOAD_REQUEST,
  BOOKMARKS_LOAD_SUCCESS,
  BookmarksActions,
  BookmarksState,
} from './bookmarks.types';

export const initialState: BookmarksState = {
  byKey: {},
  errors: [],
};

export const Bookmarks = (state = initialState, action: BookmarksActions): BookmarksState => {
  switch (action.type) {
    case BOOKMARKS_LOAD_REQUEST:
    case BOOKMARKS_LOAD_SUCCESS:
    case BOOKMARK_UPDATE_VOTE_START:
    case BOOKMARK_UPDATE_VOTE_SUCCESS:
    case BOOKMARK_CREATE_REQUEST:
    case BOOKMARK_CREATE_SUCCESS:
    case BOOKMARK_CREATE_FAILURE:
    case BOOKMARK_UPDATE_REQUEST:
    case BOOKMARK_UPDATE_SUCCESS:
    case BOOKMARK_UPDATE_FAILURE:
      return Object.assign({}, mergeDeep(state, [action.payload], { replaceArrays: true }));
    default:
      return Object.assign({}, state);
  }
};
