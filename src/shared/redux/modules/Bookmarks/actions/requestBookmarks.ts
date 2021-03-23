import { BookmarksActions, BOOKMARKS_LOAD_REQUEST } from 'Modules/Bookmarks/bookmarks.types';

export const requestBookmarks = (): BookmarksActions => ({
  type: BOOKMARKS_LOAD_REQUEST,
  data: {
    loading: true,
  },
});
