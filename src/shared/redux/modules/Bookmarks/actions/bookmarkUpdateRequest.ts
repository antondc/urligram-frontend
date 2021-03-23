import { BOOKMARK_UPDATE_REQUEST, BookmarksActions } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkUpdateRequest = (): BookmarksActions => ({
  type: BOOKMARK_UPDATE_REQUEST,
  payload: undefined,
});
