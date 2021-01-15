import { BookmarksActionsTypes, BookmarksState, VOTE_BOOKMARK_START } from 'Modules/Bookmarks/bookmarks.types';

export const voteBookmarkRequest = (payload: BookmarksState): BookmarksActionsTypes => ({
  type: VOTE_BOOKMARK_START,
  payload,
});
