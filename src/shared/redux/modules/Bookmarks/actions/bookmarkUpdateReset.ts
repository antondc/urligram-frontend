import { BOOKMARK_UPDATE_RESET, BookmarksActions } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkUpdateReset = (): BookmarksActions => ({
  type: BOOKMARK_UPDATE_RESET,
  data: {
    bookmarkUpdateSuccess: undefined,
  },
});
