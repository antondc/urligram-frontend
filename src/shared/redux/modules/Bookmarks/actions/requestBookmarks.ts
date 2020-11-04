import { BookmarksActionsTypes,LOAD_BOOKMARKS_STARTED } from 'Root/src/shared/redux/modules/Bookmarks/bookmarks.types';

export const requestBookmarks = (): BookmarksActionsTypes => ({
  type: LOAD_BOOKMARKS_STARTED,
  data: {
    loading: true,
  },
});
