import { LOAD_BOOKMARKS_STARTED, LOAD_BOOKMARKS_SUCCESS, BookmarksState } from './bookmarks.types';

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
    default:
      return Object.assign({}, state);
  }
};
