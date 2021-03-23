import { BOOKMARKS_LOAD_REQUEST, BookmarksActions } from 'Modules/Bookmarks/bookmarks.types';

export const requestBookmarks = (): BookmarksActions => ({
  type: BOOKMARKS_LOAD_REQUEST,
  payload: {
    loading: true,
    meta: {
      sort: undefined,
    },
  },
});
