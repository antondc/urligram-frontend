import { BOOKMARK_CREATE_FAILURE, BookmarksActionsTypes, BookmarksError } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateFailure = ({
  error,
  bookmarkId,
}: {
  error: BookmarksError;
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
