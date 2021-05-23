import { BookmarksActions, BookmarksGetApiResponse, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { bookmarksLoadFailure } from './bookmarksLoadFailure';
import { bookmarksLoadRequest } from './bookmarksLoadRequest';
import { bookmarksLoadSuccess } from './bookmarksLoadSuccess';

export const bookmarksLoadBySize = (size?: number): AppThunk<Promise<BookmarkState[]>, BookmarksActions> => async (
  dispatch,
  getState
): Promise<BookmarkState[]> => {
  try {
    const { Bookmarks: bookmarksBeforeRequest } = getState();

    dispatch(
      bookmarksLoadRequest({
        ...bookmarksBeforeRequest,
        loading: true,
      })
    );

    const { data } = await HttpClient.get<void, BookmarksGetApiResponse>('bookmarks', {
      params: {
        page: {
          size,
        },
      },
    });
    const bookmarksArray = data?.map((item) => item.attributes);
    const { Bookmarks: bookmarksAfterResponse } = getState();

    dispatch(
      bookmarksLoadSuccess({
        ...bookmarksAfterResponse,
        byKey: {
          ...bookmarksAfterResponse.byKey,
          ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksArray }),
        },
        currentIds: data?.map((item) => item.id),
        loading: false,
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
