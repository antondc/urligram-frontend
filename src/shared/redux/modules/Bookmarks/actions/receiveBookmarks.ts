import { BOOKMARKS_LOAD_SUCCESS, BookmarksActions, BookmarksState } from 'Modules/Bookmarks/bookmarks.types';

export const receiveBookmarks = (bookmarks: BookmarksState): BookmarksActions => ({
  type: BOOKMARKS_LOAD_SUCCESS,
  payload: {
    ...bookmarks,
    loading: false,
  },
});
