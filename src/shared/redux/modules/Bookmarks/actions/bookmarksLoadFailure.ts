import { BOOKMARKS_LOAD_FAILURE, BookmarksActions, BookmarksState } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarksLoadFailure = (payload: BookmarksState): BookmarksActions => ({
  type: BOOKMARKS_LOAD_FAILURE,
  payload,
});
