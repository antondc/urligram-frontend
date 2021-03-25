import { BOOKMARK_UPDATE_FAILURE, BookmarksActions, BookmarksState } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkUpdateFailure = (payload: BookmarksState): BookmarksActions => ({
  type: BOOKMARK_UPDATE_FAILURE,
  payload,
});
