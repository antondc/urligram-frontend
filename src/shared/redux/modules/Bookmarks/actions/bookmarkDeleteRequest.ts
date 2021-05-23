import { BOOKMARK_DELETE_REQUEST, BookmarksActions, BookmarksState } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkDeleteRequest = (payload: BookmarksState): BookmarksActions => ({
  type: BOOKMARK_DELETE_REQUEST,
  payload,
});
