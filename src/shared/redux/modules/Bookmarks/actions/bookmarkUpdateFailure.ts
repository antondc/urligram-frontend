import { BOOKMARK_UPDATE_FAILURE, BookmarkError, BookmarksActions } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkUpdateFailure = (errors: BookmarkError[]): BookmarksActions => ({
  type: BOOKMARK_UPDATE_FAILURE,
  payload: {
    errors,
  },
});
