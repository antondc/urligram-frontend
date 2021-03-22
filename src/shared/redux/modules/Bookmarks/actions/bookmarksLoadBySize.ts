import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { BookmarkState, ReceiveBookmarkItem, ReceiveBookmarksResponse } from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { loadBookmarksSuccess } from './loadBookmarksSuccess';
import { requestBookmarks } from './requestBookmarks';

export const bookmarksLoadBySize = (size?: number): ThunkAction<any, any, any, Action> => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(requestBookmarks());

    const { data }: ReceiveBookmarksResponse = await HttpClient.get('bookmarks', {
      params: {
        page: {
          size,
        },
      },
    });

    const bookmarksByKey = {
      byKey: serializerFromArrayToByKey<ReceiveBookmarkItem, BookmarkState>({
        data: data,
        contentPath: 'attributes',
      }),
      currentIds: data.map((item) => item.id),
    };
    dispatch(loadBookmarksSuccess(bookmarksByKey));
  } catch (err) {
    throw new Error(err);
  }

  return;
};
