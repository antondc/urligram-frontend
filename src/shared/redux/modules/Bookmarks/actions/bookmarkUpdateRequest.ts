import { BOOKMARK_UPDATE_REQUEST, BookmarksActions, BookmarksState } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkUpdateRequest = (payload: BookmarksState): BookmarksActions => ({
  type: BOOKMARK_UPDATE_REQUEST,
  payload,
});
