import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import {
  BOOKMARKS_RECOMMENDED_FAILURE,
  BOOKMARKS_RECOMMENDED_REQUEST,
  BOOKMARKS_RECOMMENDED_SUCCESS,
  BookmarksActions,
  BookmarksGetApiResponse,
  BookmarkState,
} from '../bookmarks.types';

export const bookmarksRecommended = (): AppThunk<Promise<Array<BookmarkState>>, BookmarksActions> => async (
  dispatch,
  getState
): Promise<Array<BookmarkState>> => {
  const { Bookmarks: bookmarksBeforeRequest } = getState();

  try {
    dispatch({
      type: BOOKMARKS_RECOMMENDED_REQUEST,
      payload: {
        ...bookmarksBeforeRequest,
        loading: true,
      },
    });

    const {
      meta: { totalItems, sort },
      data,
    } = await HttpClient.get<void, BookmarksGetApiResponse>(`/users/me/recommended${window.location.search}`);

    const bookmarksArray = data?.map((item) => item.attributes);

    const { Bookmarks: bookmarksAfterResponse } = getState();
    dispatch({
      type: BOOKMARKS_RECOMMENDED_SUCCESS,
      payload: {
        ...bookmarksAfterResponse,
        byKey: {
          ...bookmarksAfterResponse?.byKey,
          ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksArray }),
        },
        currentIds: data?.map((item) => item.id),
        loading: false,
        meta: {
          totalItems,
          sort,
        },
      },
    });

    return bookmarksArray;
  } catch (error) {
    const { Bookmarks: bookmarksOnError } = getState();
    dispatch({
      type: BOOKMARKS_RECOMMENDED_FAILURE,
      payload: {
        ...bookmarksOnError,
        errors: [...(bookmarksOnError?.errors || []), error],
      },
    });

    return error;
  }
};
