import { BOOKMARK_CREATE_RESET, BookmarksActionsTypes } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateReset = (): BookmarksActionsTypes => ({
  type: BOOKMARK_CREATE_RESET,
});
