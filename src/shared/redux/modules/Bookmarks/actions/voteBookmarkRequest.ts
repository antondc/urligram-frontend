import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { BOOKMARK_UPDATE_VOTE_START, BookmarksState } from 'Modules/Bookmarks/bookmarks.types';

export const voteBookmarkRequest = ({ linkId }: { linkId: string | number }): ThunkAction<any, any, any, Action> => (
  dispatch: Dispatch,
  getState
) => {
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
