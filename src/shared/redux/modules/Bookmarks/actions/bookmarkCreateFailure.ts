import { BOOKMARK_CREATE_FAILURE, BookmarksActions, BookmarksState } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateFailure = (payload: BookmarksState): BookmarksActions => ({
  type: BOOKMARK_CREATE_FAILURE,
  payload,
});
