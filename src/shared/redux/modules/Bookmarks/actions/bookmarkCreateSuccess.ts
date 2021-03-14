import { BOOKMARK_CREATE_SUCCESS, BookmarksActionsTypes, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateSuccess = (bookmark: BookmarkState): BookmarksActionsTypes => ({
  type: BOOKMARK_CREATE_SUCCESS,
  data: {
    loading: false,
    bookmark,
  },
});
