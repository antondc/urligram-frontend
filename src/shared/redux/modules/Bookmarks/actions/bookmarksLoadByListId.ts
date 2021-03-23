import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { receiveBookmarks } from 'Modules/Bookmarks/actions/receiveBookmarks';
import { requestBookmarks } from 'Modules/Bookmarks/actions/requestBookmarks';
import { BookmarkGetItemResponse, BookmarksGetResponse, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';

export const bookmarksLoadByListId = (listId: number): ThunkAction<any, any, any, Action> => async (
  dispatch: Dispatch
) => {
  try {
    dispatch(requestBookmarks());

    const {
      meta: { totalItems, sort },
      data: bookmarksData,
    }: BookmarksGetResponse = await HttpClient.get(`/lists/${listId}/bookmarks${window.location.search}`);

    const bookmarksByKey = {
      byKey: serializerFromArrayToByKey<BookmarkGetItemResponse, BookmarkState>({
        data: bookmarksData,
        contentPath: 'attributes',
      }),
      currentIds: bookmarksData.map((item) => item.id),
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
