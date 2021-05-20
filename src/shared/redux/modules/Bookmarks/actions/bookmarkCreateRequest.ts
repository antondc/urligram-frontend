import { BOOKMARK_CREATE_REQUEST, BookmarksActions, BookmarksState } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateRequest = (payload: BookmarksState): BookmarksActions => ({
  type: BOOKMARK_CREATE_REQUEST,
  payload,
});
