import { BOOKMARKS_LOAD_SUCCESS, BookmarksActions, BookmarksState } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarksLoadSuccess = (payload: BookmarksState): BookmarksActions => ({
  type: BOOKMARKS_LOAD_SUCCESS,
  payload,
});
