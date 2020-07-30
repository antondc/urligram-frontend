import {
  LOAD_BOOKMARKS_SUCCESS,
  BookmarksState,
  BookmarksActionsTypes,
} from 'Root/src/shared/redux/modules/Bookmarks/bookmarks.types';

export const receiveBookmarks = (data: BookmarksState): BookmarksActionsTypes => {
  return {
    type: LOAD_BOOKMARKS_SUCCESS,
    data: {
      ...data,
    },
  };
};
