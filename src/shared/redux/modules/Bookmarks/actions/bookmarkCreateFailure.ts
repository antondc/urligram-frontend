import { BOOKMARK_CREATE_FAILURE, BookmarkError, BookmarksActions } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateFailure = ({
  error,
  bookmarkId,
}: {
  error: BookmarkError;
  bookmarkId: number;
}): BookmarksActions => ({
  type: BOOKMARK_CREATE_FAILURE,
  data: {
    bookmarkCreationLoading: false,
    bookmarkCreationSuccess: false,
    error,
    bookmarkId,
  },
});
