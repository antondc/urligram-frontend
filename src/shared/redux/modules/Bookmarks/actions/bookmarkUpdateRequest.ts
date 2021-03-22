import { BOOKMARK_UPDATE_REQUEST, BookmarksActionsTypes } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkUpdateRequest = (): BookmarksActionsTypes => ({
  type: BOOKMARK_UPDATE_REQUEST,
});
