import { BOOKMARK_CREATE_SUCCESS, BookmarksActionsTypes, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateSuccess = ({
  originalBookmarkId,
  bookmark,
}: {
  originalBookmarkId: number;
  bookmark: BookmarkState;
}): BookmarksActionsTypes => ({
  type: BOOKMARK_CREATE_SUCCESS,
  data: {
    originalBookmarkId,
    bookmark,
  },
});
