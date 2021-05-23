import { BOOKMARK_UPDATE_SUCCESS, BookmarksActions, BookmarksState } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkUpdateSuccess = (payload: BookmarksState): BookmarksActions => ({
  type: BOOKMARK_UPDATE_SUCCESS,
  payload,
});
