import { BOOKMARK_CREATE_SUCCESS, BookmarksActions, BookmarksState } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateSuccess = (bookmarksState: BookmarksState): BookmarksActions => ({
  type: BOOKMARK_CREATE_SUCCESS,
  payload: bookmarksState,
});
