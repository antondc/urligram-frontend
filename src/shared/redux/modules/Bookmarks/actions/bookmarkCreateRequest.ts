import { BOOKMARK_CREATE_REQUEST, BookmarksActionsTypes } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateRequest = (bookmarkId?: number): BookmarksActionsTypes => ({
  type: BOOKMARK_CREATE_REQUEST,
  data: {
    bookmarkId,
  },
});
