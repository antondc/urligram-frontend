import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { BookmarkState, ReceiveBookmarkItem, ReceiveBookmarksResponse } from 'Modules/Bookmarks/bookmarks.types';
import { QueryStringWrapper } from 'Root/src/shared/services/QueryStringWrapper';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { RootState } from '../../rootType';
import { receiveBookmarks } from './receiveBookmarks';
import { requestBookmarks } from './requestBookmarks';

export const loadBookmarksByUserId = (userId: string, size?: number): ThunkAction<any, any, any, Action> => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  try {
    const { Bookmarks: bookmarksState } = getState();
    const activeSort = bookmarksState?.meta?.sort;
    dispatch(requestBookmarks());

    const queryStringParsed = QueryStringWrapper.parseQueryString(window.location.search);
    const queryParams = {
      page: { size },
      sort: activeSort,
      ...queryStringParsed,
    };
    const queryStringUpdated = QueryStringWrapper.stringifyQueryParams(queryParams);

    const apiEndpoint = `/users/${userId}/bookmarks?${queryStringUpdated}`;

    const {
      meta: { totalItems, sort },
      data,
    }: ReceiveBookmarksResponse = await HttpClient.get(apiEndpoint);

    const bookmarksByKey = {
      byKey: serializerFromArrayToByKey<ReceiveBookmarkItem, BookmarkState>({
        data: data,
        contentPath: 'attributes',
      }),
      currentIds: data.map((item) => item.id),
      meta: {
        totalItems,
        sort,
      },
    };
    dispatch(receiveBookmarks(bookmarksByKey));
  } catch (err) {
    throw new Error(err);
  }

  return;
};
