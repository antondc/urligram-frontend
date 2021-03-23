import { BOOKMARK_CREATE_RESET, BookmarksActions } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateReset = (): BookmarksActions => ({
  type: BOOKMARK_CREATE_RESET,
});
