import { BookmarksActionsTypes, BookmarkState, VOTE_UPDATE_BOOKMARK_START } from 'Modules/Bookmarks/bookmarks.types';

export const voteBookmarkRequest = (payload: BookmarkState): BookmarksActionsTypes => ({
  type: VOTE_UPDATE_BOOKMARK_START,
  payload,
});
