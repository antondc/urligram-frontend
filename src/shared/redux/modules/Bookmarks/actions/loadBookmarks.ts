import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { BookmarkGetItemResponse, BookmarksGetResponse, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { receiveBookmarks } from './receiveBookmarks';
import { requestBookmarks } from './requestBookmarks';

export const loadBookmarks = (): ThunkAction<any, any, any, Action> => async (dispatch: Dispatch) => {
  try {
    dispatch(requestBookmarks());

    const {
      meta: { totalItems, sort },
      data,
    }: BookmarksGetResponse = await HttpClient.get(`bookmarks${window.location.search}`);

    const bookmarksByKey = {
      byKey: serializerFromArrayToByKey<BookmarkGetItemResponse, BookmarkState>({
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
