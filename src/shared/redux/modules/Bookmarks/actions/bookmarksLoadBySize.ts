import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { BookmarkGetItemResponse, BookmarksGetResponse, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { receiveBookmarks } from './receiveBookmarks';
import { requestBookmarks } from './requestBookmarks';

export const bookmarksLoadBySize = (size?: number): ThunkAction<any, any, any, Action> => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(requestBookmarks());

    const { data }: BookmarksGetResponse = await HttpClient.get('bookmarks', {
      params: {
        page: {
          size,
        },
      },
    });

    const bookmarksByKey = {
      byKey: serializerFromArrayToByKey<BookmarkGetItemResponse, BookmarkState>({
        data: data,
        contentPath: 'attributes',
      }),
      currentIds: data.map((item) => item.id),
    };
    dispatch(receiveBookmarks(bookmarksByKey));
  } catch (err) {
    throw new Error(err);
  }

  return;
};
