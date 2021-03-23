import { BOOKMARK_CREATE_REQUEST, BookmarksActions } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkCreateRequest = (): BookmarksActions => ({
  type: BOOKMARK_CREATE_REQUEST,
  payload: undefined,
});
