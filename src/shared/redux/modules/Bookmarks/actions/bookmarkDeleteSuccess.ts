import { BOOKMARK_DELETE_SUCCESS, BookmarksActions, BookmarksState } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkDeleteSuccess = (payload: BookmarksState): BookmarksActions => ({
  type: BOOKMARK_DELETE_SUCCESS,
  payload,
});
