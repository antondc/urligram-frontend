import { BookmarksActions, types } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkUpdateRequest = (): BookmarksActions => ({
  type: types.BOOKMARK_UPDATE_REQUEST,
  payload: undefined,
});
