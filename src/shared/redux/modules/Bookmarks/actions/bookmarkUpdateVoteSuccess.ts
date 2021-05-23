import {
  BOOKMARK_UPDATE_VOTE_SUCCESS,
  BookmarksActions,
  BookmarksState,
  BookmarkState,
  LinkStatistics,
} from 'Modules/Bookmarks/bookmarks.types';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';

interface Props {
  linkId: string | number;
  statistics: LinkStatistics;
}

export const bookmarkUpdateVoteSuccess = ({ linkId, statistics }: Props): AppThunk<void, BookmarksActions> => (
  dispatch,
  getState
): void => {
  const { Bookmarks } = getState();

  const bookmarksWithUpdatedStatistics = Object.values(Bookmarks.byKey)
    .filter((item) => item?.linkId === linkId)
    .map((item) => ({ ...item, statistics }));

  const bookmarksStateFormatted: BookmarksState = {
    ...Bookmarks,
    byKey: {
      ...Bookmarks.byKey,
      ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksWithUpdatedStatistics }),
    },
  };

  dispatch({
    type: BOOKMARK_UPDATE_VOTE_SUCCESS,
    payload: bookmarksStateFormatted,
  });
};
