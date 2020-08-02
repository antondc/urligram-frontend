import { LOAD_BOOKMARKS_SUCCESS, BookmarksState, BookmarksActionsTypes } from 'Modules/Bookmarks/bookmarks.types';

export const receiveBookmarks = (data: BookmarksState): BookmarksActionsTypes => {
  return {
    type: LOAD_BOOKMARKS_SUCCESS,
    data: {
      ...data,
    },
  };
};
