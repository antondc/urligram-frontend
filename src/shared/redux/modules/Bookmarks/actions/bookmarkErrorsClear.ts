import { BOOKMARKS_ERRORS_CLEAR, BookmarksActions } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkErrorsClear = (): BookmarksActions => ({
  type: BOOKMARKS_ERRORS_CLEAR,
  payload: {
    errors: [],
  },
});
