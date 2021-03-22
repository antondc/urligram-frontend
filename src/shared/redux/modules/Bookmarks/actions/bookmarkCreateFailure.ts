import { BookmarkError, BookmarksActions, types } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateFailure = ({
  error,
  bookmarkId,
}: {
  error: BookmarkError;
  bookmarkId: number;
}): BookmarksActions => ({
  type: types.BOOKMARK_CREATE_FAILURE,
  payload: {
    byKey: {
      [bookmarkId]: {
        bookmarkingLoading: undefined,
      },
    },
    errors: [error],
  },
});
