import { BOOKMARK_UPDATE_VOTE_START, BookmarksActions, BookmarksState } from 'Modules/Bookmarks/bookmarks.types';
import { AppThunk } from '../../..';

export const bookmarkVoteRequest = ({ linkId }: { linkId: string | number }): AppThunk<void, BookmarksActions> => (
  dispatch,
  getState
): void => {
  const { Bookmarks }: { Bookmarks: BookmarksState } = getState();

  const payloadFormatted = Object.entries(Bookmarks.byKey).filter(([, value]) => value.linkId === linkId);
  const payloadFormattedLoader = payloadFormatted.map(([key, value]) => [
    key,
    {
      ...value,
      statistics: {
        ...value.statistics,
        loading: true,
      },
    },
  ]);
  const bookmarksStateFormatted: BookmarksState = {
    ...Bookmarks,
    byKey: {
      ...Bookmarks.byKey,
      ...Object.fromEntries(payloadFormattedLoader),
    },
  };

  dispatch({
    type: BOOKMARK_UPDATE_VOTE_START,
    payload: bookmarksStateFormatted,
  });
};
