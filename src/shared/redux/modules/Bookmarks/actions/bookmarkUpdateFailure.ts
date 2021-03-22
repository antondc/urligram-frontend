import { BookmarkError, BookmarksActions, types } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkUpdateFailure = ({ error }: { error: BookmarkError }): BookmarksActions => ({
  type: types.BOOKMARK_UPDATE_FAILURE,
  payload: {
    errors: [error],
    bookmarkUpdateSuccess: false,
  },
});
