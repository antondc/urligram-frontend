import { BookmarksActions, BookmarkState, types } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateSuccess = ({
  originalBookmarkId,
  bookmark,
}: {
  originalBookmarkId: number;
  bookmark: BookmarkState;
}): BookmarksActions => ({
  type: types.BOOKMARK_CREATE_SUCCESS,
  payload: {
    byKey: {
      [originalBookmarkId]: {
        users: bookmark.users,
        bookmarkingLoading: undefined,
      },
    },
  },
});
