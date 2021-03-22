import { BookmarksActions, BookmarksState, types } from 'Modules/Bookmarks/bookmarks.types';

export const loadBookmarksSuccess = (payload: BookmarksState): BookmarksActions => ({
  type: types.LOAD_BOOKMARKS_SUCCESS,
  payload,
});
