import { BookmarksActionsTypes, LOAD_BOOKMARKS_STARTED } from 'Modules/Bookmarks/bookmarks.types';

export const requestBookmarks = (): BookmarksActionsTypes => ({
  type: LOAD_BOOKMARKS_STARTED,
  data: {
    loading: true,
  },
});
