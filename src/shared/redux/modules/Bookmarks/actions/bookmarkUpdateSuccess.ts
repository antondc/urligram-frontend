import { BookmarksActions, BookmarkState, types } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkUpdateSuccess = ({ bookmark }: { bookmark: BookmarkState }): BookmarksActions => ({
  type: types.BOOKMARK_UPDATE_SUCCESS,
  payload: {
    byKey: {
      [bookmark?.id]: bookmark,
    },
    bookmarkUpdateSuccess: true,
  },
});
