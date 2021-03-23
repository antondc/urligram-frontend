import { BookmarksActionsTypes,BookmarksState, LOAD_BOOKMARKS_SUCCESS } from 'Modules/Bookmarks/bookmarks.types';

export const receiveBookmarks = (data: BookmarksState): BookmarksActionsTypes => ({
  type: LOAD_BOOKMARKS_SUCCESS,
  data: {
    ...data,
  },
});
