import { BOOKMARKS_LOAD_REQUEST, BookmarksActions, BookmarksState } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarksLoadRequest = (payload: BookmarksState): BookmarksActions => ({
  type: BOOKMARKS_LOAD_REQUEST,
  payload,
});
