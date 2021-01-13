import {
  BOOKMARK_UPDATE_VOTE,
  BookmarksState,
  LOAD_BOOKMARKS_STARTED,
  LOAD_BOOKMARKS_SUCCESS,
} from './bookmarks.types';

const initialState: BookmarksState = {
  byKey: {},
};

export const Bookmarks = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BOOKMARKS_STARTED:
      return Object.assign({}, state, {
        loading: true,
      });
    case LOAD_BOOKMARKS_SUCCESS:
      return Object.assign({}, state, {
        byKey: {
          ...state.byKey,
          ...action.data.byKey,
        },
        loading: false,
      });
    case BOOKMARK_UPDATE_VOTE:
      return Object.assign({}, state, {
        byKey: {
          ...state.byKey,
          [action.data.linkId]: {
            ...state.byKey[action.data.linkId],
            statistics: {
              ...state.byKey[action.data.linkId].statistics,
              vote: action.data.vote,
            },
          },
        },
        loading: false,
      });
    default:
      return Object.assign({}, state);
  }
};
