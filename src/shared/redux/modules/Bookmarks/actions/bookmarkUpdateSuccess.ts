import { BOOKMARK_UPDATE_SUCCESS, BookmarksActions, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkUpdateSuccess = ({ bookmark }: { bookmark: BookmarkState }): BookmarksActions => ({
  type: BOOKMARK_UPDATE_SUCCESS,
  payload: {
    bookmark,
  },
});
