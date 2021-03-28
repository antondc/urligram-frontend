import { BOOKMARK_DELETE_FAILURE, BookmarksActions, BookmarksState } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkDeleteFailure = (payload: BookmarksState): BookmarksActions => ({
  type: BOOKMARK_DELETE_FAILURE,
  payload,
});
