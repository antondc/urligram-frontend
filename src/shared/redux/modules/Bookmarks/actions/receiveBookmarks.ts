import { BookmarksActions, BookmarksState, BOOKMARKS_LOAD_SUCCESS } from 'Modules/Bookmarks/bookmarks.types';

export const receiveBookmarks = (data: BookmarksState): BookmarksActions => ({
  type: BOOKMARKS_LOAD_SUCCESS,
  data: {
    ...data,
  },
});
