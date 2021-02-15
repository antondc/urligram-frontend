import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { BookmarkState, ReceiveBookmarkItem, ReceiveBookmarksResponse } from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { receiveBookmarks } from './receiveBookmarks';
import { requestBookmarks } from './requestBookmarks';

export const loadBookmarks = (): ThunkAction<any, any, any, Action> => async (dispatch: Dispatch) => {
  try {
    dispatch(requestBookmarks());

    const {
      meta: { totalItems },
      data,
    }: ReceiveBookmarksResponse = await HttpClient.get(`bookmarks${window.location.search}`);

    const bookmarksByKey = {
      byKey: serializerFromArrayToByKey<ReceiveBookmarkItem, BookmarkState>({
        data: data,
        contentPath: 'attributes',
      }),
      currentIds: data.map((item) => item.id),
      meta: {
        totalItems,
      },
    };
    dispatch(receiveBookmarks(bookmarksByKey));
  } catch (err) {
    throw new Error(err);
  }

  return;
};
