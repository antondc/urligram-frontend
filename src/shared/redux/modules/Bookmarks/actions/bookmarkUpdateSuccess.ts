import { BOOKMARK_UPDATE_SUCCESS, BookmarksActionsTypes, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkUpdateSuccess = ({ bookmark }: { bookmark: BookmarkState }): BookmarksActionsTypes => ({
  type: BOOKMARK_UPDATE_SUCCESS,
  data: {
    bookmark,
    bookmarkUpdateSuccess: true,
  },
});
