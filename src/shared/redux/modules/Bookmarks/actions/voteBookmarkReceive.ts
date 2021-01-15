import { BookmarksActionsTypes, BookmarkState, VOTE_UPDATE_BOOKMARK_SUCCESS } from 'Modules/Bookmarks/bookmarks.types';

export const voteBookmarkReceive = (payload: BookmarkState): BookmarksActionsTypes => ({
  type: VOTE_UPDATE_BOOKMARK_SUCCESS,
  payload,
});
