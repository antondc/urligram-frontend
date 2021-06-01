import { BOOKMARK_UPDATE_VOTE_REQUEST, BookmarksActions, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';

export const bookmarkUpdateVoteRequest = ({ linkId }: { linkId: number }): AppThunk<void, BookmarksActions> => (
  dispatch,
  getState
): void => {
  try {
    const { Bookmarks } = getState();

    const bookmarksWithUpdatedStatistics = Object.values(Bookmarks.byKey)
      .filter((item) => item?.linkId === linkId)
      .map((item) => ({
        ...item,
        statistics: {
          ...item.statistics,
          loading: true,
        },
      }));

    dispatch({
      type: BOOKMARK_UPDATE_VOTE_REQUEST,
      payload: {
        ...Bookmarks,
        byKey: {
          ...Bookmarks.byKey,
          ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksWithUpdatedStatistics }),
        },
      },
    });
  } catch (error) {
    throw error;
  }
};
