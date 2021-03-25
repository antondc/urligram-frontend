import { BookmarksActions, BookmarksGetResponse, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { receiveBookmarks } from './receiveBookmarks';
import { requestBookmarks } from './requestBookmarks';

export const bookmarksLoadBySize = (size?: number): AppThunk<Promise<BookmarkState[]>, BookmarksActions> => async (
  dispatch
): Promise<BookmarkState[]> => {
  try {
    dispatch(requestBookmarks());

    const { data } = await HttpClient.get<void, BookmarksGetResponse>('bookmarks', {
      params: {
        page: {
          size,
        },
      },
    });
    const bookmarksArray = data.map((item) => item.attributes);

    const bookmarksByKey = {
      byKey: serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksArray }),
      currentIds: data.map((item) => item.id),
    };
    dispatch(receiveBookmarks(bookmarksByKey));

    return bookmarksArray;
  } catch (err) {
    throw new Error(err);
  }
};
