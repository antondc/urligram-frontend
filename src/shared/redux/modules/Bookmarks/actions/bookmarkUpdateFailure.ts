import { BOOKMARK_UPDATE_FAILURE, BookmarkError, BookmarksActions } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkUpdateFailure = ({ error }: { error: BookmarkError }): BookmarksActions => ({
  type: BOOKMARK_UPDATE_FAILURE,
  data: {
    error,
    bookmarkUpdateSuccess: false,
  },
});
