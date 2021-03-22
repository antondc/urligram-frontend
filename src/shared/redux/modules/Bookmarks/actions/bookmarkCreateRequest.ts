import { BookmarksActions, types } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateRequest = (bookmarkId?: number): BookmarksActions => ({
  type: types.BOOKMARK_CREATE_REQUEST,
  payload: {
    byKey: {
      [bookmarkId]: {
        bookmarkingLoading: true,
      },
    },
  },
});
