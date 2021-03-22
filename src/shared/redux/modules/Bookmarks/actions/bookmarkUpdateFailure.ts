import { BOOKMARK_UPDATE_FAILURE, BookmarkError, BookmarksActionsTypes } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkUpdateFailure = ({ error }: { error: BookmarkError }): BookmarksActionsTypes => ({
  type: BOOKMARK_UPDATE_FAILURE,
  data: {
    error,
    bookmarkUpdateSuccess: false
  },
});
