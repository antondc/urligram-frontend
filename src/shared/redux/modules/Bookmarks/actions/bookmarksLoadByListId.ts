import { bookmarksLoadRequest } from 'Modules/Bookmarks/actions/bookmarksLoadRequest';
import { bookmarksLoadSuccess } from 'Modules/Bookmarks/actions/bookmarksLoadSuccess';
import { BookmarksActions, BookmarksGetApiResponse, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { bookmarksLoadFailure } from './bookmarksLoadFailure';

export const bookmarksLoadByListId = (listId: number): AppThunk<Promise<BookmarkState[]>, BookmarksActions> => async (
  dispatch,
  getState
): Promise<BookmarkState[]> => {
  if (!listId) return;

  const { Bookmarks: bookmarksBeforeRequest } = getState();
  try {
    dispatch(
      bookmarksLoadRequest({
        ...bookmarksBeforeRequest,
        loading: true,
      })
    );

    const {
      meta: { totalItems, sort },
      data: bookmarksData,
    } = await HttpClient.get<any, BookmarksGetApiResponse>(`/lists/${listId}/bookmarks${window.location.search}`);
    const bookmarksArray = bookmarksData.map((item) => item.attributes);
    const { Bookmarks: bookmarksAfterResponse } = getState();

    dispatch(
      bookmarksLoadSuccess({
        ...bookmarksAfterResponse,
        byKey: serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksArray }),
        currentIds: bookmarksData.map((item) => item.id),
        loading: false,
        meta: {
          totalItems,
          sort,
        },
      })
    );

    return bookmarksArray;
  } catch (error) {
    const { Bookmarks: bookmarksOnError } = getState();

    dispatch(
      bookmarksLoadFailure({
        ...bookmarksOnError,
        errors: [...(bookmarksOnError?.errors || []), error],
      })
    );
    throw new Error(error);
  }
};
