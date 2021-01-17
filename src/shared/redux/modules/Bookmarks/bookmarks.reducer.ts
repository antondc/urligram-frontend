import {
  BookmarksActionsTypes,
  BookmarksState,
  LOAD_BOOKMARKS_STARTED,
  LOAD_BOOKMARKS_SUCCESS,
  VOTE_UPDATE_BOOKMARK_START,
  VOTE_UPDATE_BOOKMARK_SUCCESS,
} from './bookmarks.types';

export const initialState: BookmarksState = {
  byKey: {},
};

export const Bookmarks = (state = initialState, action: BookmarksActionsTypes): BookmarksState => {
  switch (action.type) {
    case LOAD_BOOKMARKS_STARTED:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });

    case LOAD_BOOKMARKS_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        byKey: {
          ...state.byKey,
          ...action.data.byKey,
        },
        currentIds: action.data.currentIds,
        loading: false,
      });

    case VOTE_UPDATE_BOOKMARK_START:
      return Object.assign({}, state, {
        ...state,
        ...action.payload,
      });

    case VOTE_UPDATE_BOOKMARK_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...action.payload,
      });

    default:
      return Object.assign({}, state);
  }
};
