import { VOTE_UPDATE_BOOKMARK_SUCCESS } from 'Modules/Bookmarks/bookmarks.types';

export const voteBookmarkReceive = (data) => ({
  type: VOTE_UPDATE_BOOKMARK_SUCCESS,
  data: {
    ...data,
  },
});
