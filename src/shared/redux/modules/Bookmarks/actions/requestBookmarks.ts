import { BookmarksActions, types } from 'Modules/Bookmarks/bookmarks.types';

export const requestBookmarks = (): BookmarksActions => ({
  type: types.LOAD_BOOKMARKS_STARTED,
  payload: {
    loading: true,
    meta: {
      sort: undefined,
    },
  },
});
