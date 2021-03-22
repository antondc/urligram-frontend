import { BookmarksActions, types } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkUpdateReset = (): BookmarksActions => ({
  type: types.BOOKMARK_UPDATE_RESET,
  payload: {
    bookmarkUpdateSuccess: undefined,
  },
});
