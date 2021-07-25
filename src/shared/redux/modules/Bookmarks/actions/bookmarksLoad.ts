import {
  BOOKMARKS_LOAD_FAILURE,
  BookmarksActions,
  BookmarksGetApiResponse,
  BookmarkState,
} from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { bookmarksLoadRequest } from './bookmarksLoadRequest';
import { bookmarksLoadSuccess } from './bookmarksLoadSuccess';

export const bookmarksLoad =
  (): AppThunk<Promise<BookmarkState[]>, BookmarksActions> =>
  async (dispatch, getState): Promise<BookmarkState[]> => {
    try {
      const { Bookmarks: bookmarksBeforeRequest } = getState();

      dispatch(
        bookmarksLoadRequest({
          ...bookmarksBeforeRequest,
          loading: true,
        })
      );

      const {
        meta: { totalItems, sort },
        data,
      } = await HttpClient.get<void, BookmarksGetApiResponse>(`/bookmarks${window.location.search}`);
      const { Bookmarks: bookmarksAfterResponse } = getState();

      const bookmarksArray = data?.map((item) => item.attributes);
      await dispatch(
        bookmarksLoadSuccess({
          ...bookmarksAfterResponse,
          byKey: {
            ...bookmarksAfterResponse.byKey,
            ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksArray }),
          },
          currentIds: data?.map((item) => item.id),
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

      dispatch({
        type: BOOKMARKS_LOAD_FAILURE,
        payload: {
          ...bookmarksOnError,
          loading: false,
          errors: [...(bookmarksOnError.errors || []), error],
        },
      });
    }
  };
