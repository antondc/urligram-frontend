import { BOOKMARK_UPDATE_VOTE } from 'Modules/Bookmarks/bookmarks.types';

export const bookmarkUpdateVote = (data) => ({
  type: BOOKMARK_UPDATE_VOTE,
  data,
});
