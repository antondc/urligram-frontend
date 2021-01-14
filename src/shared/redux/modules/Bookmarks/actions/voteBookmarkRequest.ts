import { VOTE_BOOKMARK_START } from 'Modules/Bookmarks/bookmarks.types';

export const voteBookmarkRequest = (data) => ({
  type: VOTE_BOOKMARK_START,
  data,
});
