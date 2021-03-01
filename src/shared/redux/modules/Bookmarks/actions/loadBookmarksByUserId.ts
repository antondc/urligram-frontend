import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { BookmarkState, ReceiveBookmarkItem, ReceiveBookmarksResponse } from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { URLWrapper } from 'Services/URLWrapper';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { receiveBookmarks } from './receiveBookmarks';
import { requestBookmarks } from './requestBookmarks';

export const loadBookmarksByUserId = (userId: string, size?: number): ThunkAction<any, any, any, Action> => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(requestBookmarks());

    const url = new URLWrapper(`/users/${userId}/bookmarks${window.location.search}`);
    !!size && url.upsertSearchParams({ page: { size } });
    const apiEndpoint = url.getPathAndSearch();

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
