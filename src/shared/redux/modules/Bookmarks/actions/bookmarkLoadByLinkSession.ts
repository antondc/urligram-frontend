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

/*
  Returns the user's bookmark for this link, or the latest bookmark for this link
*/

export const bookmarkLoadByLinkSession =
  (linkId: number): AppThunk<Promise<BookmarkState>, BookmarksActions> =>
  async (dispatch, getState): Promise<BookmarkState> => {
    if (!linkId) return;

    const { Bookmarks: bookmarksBeforeRequest } = getState();
    try {
      dispatch({
        type: BOOKMARK_LOAD_BY_ID_REQUEST,
        payload: {
          ...bookmarksBeforeRequest,
          loading: true,
        },
      });

      const { data: bookmarkData } = await HttpClient.get<any, BookmarkGetApiResponse>(
        `/bookmarks/link/${linkId}/user/me`
      );
      const { Bookmarks: bookmarksAfterResponse } = getState();

      dispatch({
        type: BOOKMARK_LOAD_BY_ID_SUCCESS,
        payload: {
          ...bookmarksAfterResponse,
          byKey: {
            [bookmarkData?.id]: {
              ...bookmarksAfterResponse?.byKey[bookmarkData?.id],
              ...bookmarkData?.attributes,
            },
          },
          currentIds: [bookmarkData.id],
          loading: false,
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
          currentIds: [],
          loading: false,
        },
      });

      throw error;
    }
  };
