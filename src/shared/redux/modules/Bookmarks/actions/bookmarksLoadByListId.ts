import { Dispatch } from 'redux';

import { receiveBookmarks } from 'Modules/Bookmarks/actions/receiveBookmarks';
import { requestBookmarks } from 'Modules/Bookmarks/actions/requestBookmarks';
import { BookmarksGetResponse, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';

export const bookmarksLoadByListId = (listId: number): AppThunk<Promise<BookmarkState[]>> => async (
  dispatch: Dispatch
): Promise<BookmarkState[]> => {
  try {
    dispatch(requestBookmarks());

    const {
      meta: { totalItems, sort },
      data: bookmarksData,
    }: BookmarksGetResponse = await HttpClient.get(`/lists/${listId}/bookmarks${window.location.search}`);
    const bookmarksArray = bookmarksData.map((item) => item.attributes);

    const bookmarksByKey = {
      byKey: serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksArray }),
      currentIds: bookmarksData.map((item) => item.id),
      meta: {
        totalItems,
        sort,
      },
    };
    dispatch(receiveBookmarks(bookmarksByKey));

    return bookmarksArray;
  } catch (err) {
    throw new Error(err);
  }
};
