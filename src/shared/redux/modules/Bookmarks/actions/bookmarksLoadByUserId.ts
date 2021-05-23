import { BookmarksActions, BookmarksGetApiResponse, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { QueryStringWrapper } from 'Root/src/shared/services/QueryStringWrapper';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { bookmarksLoadFailure } from './bookmarksLoadFailure';
import { bookmarksLoadRequest } from './bookmarksLoadRequest';
import { bookmarksLoadSuccess } from './bookmarksLoadSuccess';

export const bookmarksLoadByUserId = (
  userId: string,
  size?: number
): AppThunk<Promise<BookmarkState[]>, BookmarksActions> => async (dispatch, getState): Promise<BookmarkState[]> => {
  try {
    const { Bookmarks: bookmarksBeforeRequest } = getState();
    const activeSort = bookmarksBeforeRequest?.meta?.sort;

    dispatch(
      bookmarksLoadRequest({
        ...bookmarksBeforeRequest,
        loading: true,
      })
    );

    const queryStringUpdated = QueryStringWrapper.addSearchParamsNoReplace(window.location.search, {
      page: { size },
      sort: activeSort,
    });

    const { meta, data = [] } = await HttpClient.get<void, BookmarksGetApiResponse>(
      `/users/${userId}/bookmarks?${queryStringUpdated}`
    );
    const { Bookmarks: bookmarksAfterResponse } = getState();
    const bookmarksArray = data?.map((item) => item.attributes);

    dispatch(
      bookmarksLoadSuccess({
        ...bookmarksAfterResponse,
        byKey: {
          ...bookmarksAfterResponse.byKey,
          ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksArray }),
        },
        currentIds: data?.map((item) => item.id),
        loading: false,
        meta: {
          totalItems: meta?.totalItems,
          sort: meta?.sort,
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
