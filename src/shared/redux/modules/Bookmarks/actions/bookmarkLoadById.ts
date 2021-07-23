import {
  BOOKMARK_LOAD_BY_ID_FAILURE,
  BOOKMARK_LOAD_BY_ID_REQUEST,
  BOOKMARK_LOAD_BY_ID_SUCCESS,
  BookmarkGetApiResponse,
  BookmarksActions,
  BookmarkState,
} from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';

interface Params {
  bookmarkId: number;
}

export const bookmarkLoadById =
  ({ bookmarkId }: Params): AppThunk<Promise<BookmarkState>, BookmarksActions> =>
  async (dispatch, getState): Promise<BookmarkState> => {
    if (!bookmarkId) return;

    const { Bookmarks: bookmarksBeforeRequest } = getState();
    try {
      dispatch({
        type: BOOKMARK_LOAD_BY_ID_REQUEST,
        payload: bookmarksBeforeRequest,
      });

      const { data: bookmarkData } = await HttpClient.get<any, BookmarkGetApiResponse>(`/bookmarks/${bookmarkId}`);
      const { Bookmarks: bookmarksAfterResponse } = getState();

      dispatch({
        type: BOOKMARK_LOAD_BY_ID_SUCCESS,
        payload: {
          ...bookmarksAfterResponse,
          byKey: {
            ...bookmarksAfterResponse?.byKey,
            [bookmarkData?.id]: {
              ...bookmarksAfterResponse?.byKey[bookmarkData?.id],
              ...bookmarkData?.attributes,
            },
          },
        },
      });

      return bookmarkData?.attributes;
    } catch (error) {
      const { Bookmarks: bookmarksOnError } = getState();

      dispatch({
        type: BOOKMARK_LOAD_BY_ID_FAILURE,
        payload: {
          ...bookmarksOnError,
          errors: [...(bookmarksOnError?.errors || []), error],
        },
      });

      throw error;
    }
  };
