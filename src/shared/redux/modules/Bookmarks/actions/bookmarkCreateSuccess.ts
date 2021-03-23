import { BOOKMARK_CREATE_SUCCESS, BookmarksActions, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateSuccess = ({
  originalBookmarkId,
  bookmark,
}: {
  originalBookmarkId: number;
  bookmark: BookmarkState;
}): BookmarksActions => ({
  type: BOOKMARK_CREATE_SUCCESS,
  payload: {
    originalBookmarkId,
    bookmark,
  },
});
