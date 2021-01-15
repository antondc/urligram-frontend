import { BookmarksActionsTypes, BookmarksState, VOTE_UPDATE_BOOKMARK_SUCCESS } from 'Modules/Bookmarks/bookmarks.types';

export const voteBookmarkReceive = (payload: BookmarksState): BookmarksActionsTypes => ({
  type: VOTE_UPDATE_BOOKMARK_SUCCESS,
  payload,
});
