import { BOOKMARK_CREATE_FAILURE, BookmarkError, BookmarksActionsTypes } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateFailure = ({
  error,
  bookmarkId,
}: {
  error: BookmarkError;
  bookmarkId: number;
}): BookmarksActionsTypes => ({
  type: BOOKMARK_CREATE_FAILURE,
  data: {
    bookmarkCreationLoading: false,
    bookmarkCreationSuccess: false,
    error,
    bookmarkId,
  },
});
