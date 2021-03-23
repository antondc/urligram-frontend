import { BOOKMARK_CREATE_FAILURE, BookmarkError, BookmarksActions } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateFailure = (errors: BookmarkError[]): BookmarksActions => ({
  type: BOOKMARK_CREATE_FAILURE,
  payload: {
    errors,
  },
});
