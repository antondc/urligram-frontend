import { LOAD_BOOKMARKS_STARTED, BookmarksActionsTypes } from 'Root/src/shared/redux/modules/Bookmarks/bookmarks.types';

export const requestBookmarks = (): BookmarksActionsTypes => {
  return {
    type: LOAD_BOOKMARKS_STARTED,
    data: {
      loading: true,
    },
  };
};
