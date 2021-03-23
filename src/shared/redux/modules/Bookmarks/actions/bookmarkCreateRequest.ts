import { BOOKMARK_CREATE_REQUEST, BookmarksActions } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateRequest = (bookmarkId?: number): BookmarksActions => ({
  type: BOOKMARK_CREATE_REQUEST,
  payload: {
    bookmarkId,
  },
});
