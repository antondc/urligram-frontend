import { BookmarksActions, BookmarksGetResponse, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { QueryStringWrapper } from 'Root/src/shared/services/QueryStringWrapper';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { receiveBookmarks } from './receiveBookmarks';
import { requestBookmarks } from './requestBookmarks';

export const loadBookmarksByUserId = (
  userId: string,
  size?: number
): AppThunk<Promise<BookmarkState[]>, BookmarksActions> => async (dispatch, getState): Promise<BookmarkState[]> => {
  try {
    const { Bookmarks: bookmarksState } = getState();
    const activeSort = bookmarksState?.meta?.sort;
    dispatch(requestBookmarks());

    const queryStringUpdated = QueryStringWrapper.addSearchParamsNoReplace(window.location.search, {
      page: { size },
      sort: activeSort,
    });

    const apiEndpoint = `/users/${userId}/bookmarks?${queryStringUpdated}`;

    const { meta, data = [] } = await HttpClient.get<void, BookmarksGetResponse>(apiEndpoint);

    const bookmarksArray = data.map((item) => item.attributes);

    const bookmarksByKey = {
      byKey: serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksArray }),
      currentIds: data.map((item) => item.id),
      meta: {
        totalItems: meta?.totalItems,
        sort: meta?.sort,
      },
    };
    dispatch(receiveBookmarks(bookmarksByKey));

    return bookmarksArray;
  } catch (err) {
    throw new Error(err);
  }

  return;
};
