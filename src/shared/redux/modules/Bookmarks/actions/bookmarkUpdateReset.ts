import { BOOKMARK_UPDATE_RESET, BookmarksActionsTypes } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkUpdateReset = (): BookmarksActionsTypes => ({
  type: BOOKMARK_UPDATE_RESET,
  data: {
    bookmarkUpdateSuccess: undefined,
  },
});
