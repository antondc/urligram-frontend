import {
  BOOKMARK_UPDATE_VOTE_SUCCESS,
  BookmarksActions,
  BookmarksState,
  LinkStatistics,
} from 'Modules/Bookmarks/bookmarks.types';
import { AppThunk } from '../../..';

interface Props {
  linkId: string | number;
  statistics: LinkStatistics;
}

export const voteBookmarkReceive = ({ linkId, statistics }: Props): AppThunk<void> => (dispatch, getState): void => {
  const { Bookmarks }: { Bookmarks: BookmarksState } = getState();

  const payloadFormatted = Object.entries(Bookmarks.byKey).filter(([, value]) => value.linkId === linkId);
  const payloadFormattedLoader = payloadFormatted.map(([key, value]) => [
    key,
    {
      ...value,
      statistics: {
        ...statistics,
        loading: undefined,
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
    type: BOOKMARK_UPDATE_VOTE_SUCCESS,
    payload: bookmarksStateFormatted,
  });
};
