import { BOOKMARK_CREATE_REQUEST, BookmarksActionsTypes } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateRequest = (): BookmarksActionsTypes => ({
  type: BOOKMARK_CREATE_REQUEST,
  data: {
    bookmarkCreationLoading: true,
  },
});
