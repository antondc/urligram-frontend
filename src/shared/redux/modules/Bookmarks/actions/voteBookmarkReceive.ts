import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { BookmarksState, LinkStatistics, BOOKMARK_UPDATE_VOTE_SUCCESS } from 'Modules/Bookmarks/bookmarks.types';

interface Props {
  linkId: string | number;
  statistics: LinkStatistics;
}

export const voteBookmarkReceive = ({ linkId, statistics }: Props): ThunkAction<any, any, any, Action> => (
  dispatch: Dispatch,
  getState
) => {
  const { Bookmarks }: { Bookmarks: BookmarksState } = getState();

  const payloadFormatted = Object.entries(Bookmarks.byKey).filter(([, value]) => value.linkId === linkId);
  const payloadFormattedLoader = payloadFormatted.map(([key, value]) => [
    key,
    {
      ...value,
      statistics,
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
    type: BOOKMARK_UPDATE_VOTE_SUCCESS,
    payload: bookmarksStateFormatted,
  });
};
