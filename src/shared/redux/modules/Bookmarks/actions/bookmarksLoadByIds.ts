import {
  BOOKMARKS_LOAD_BY_IDS_FAILURE,
  BOOKMARKS_LOAD_BY_IDS_REQUEST,
  BOOKMARKS_LOAD_BY_IDS_SUCCESS,
  BookmarksActions,
  BookmarksGetApiResponse,
  BookmarkState,
} from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { QueryStringWrapper, serializerFromArrayToByKey } from '@antoniodcorrea/utils';
import { AppThunk } from '../../..';

interface Params {
  ids: number[];
}

export const bookmarkLoadByIds =
  ({ ids }: Params): AppThunk<Promise<BookmarkState[]>, BookmarksActions> =>
  async (dispatch, getState): Promise<BookmarkState[]> => {
    if (!ids?.length) return;

    const { Bookmarks: bookmarksBeforeRequest } = getState();
    try {
      dispatch({
        type: BOOKMARKS_LOAD_BY_IDS_REQUEST,
        payload: bookmarksBeforeRequest,
      });
      const queryStringUpdated = QueryStringWrapper.addSearchParamsNoReplace(window.location.search, {
        ids,
      });

      const { data: bookmarksData } = await HttpClient.get<any, BookmarksGetApiResponse>(
        `/bookmarks/ids?${queryStringUpdated}`
      );
      const { Bookmarks: bookmarksAfterResponse } = getState();
      const bookmarksArray = bookmarksData?.map((item) => item.attributes);

      dispatch({
        type: BOOKMARKS_LOAD_BY_IDS_SUCCESS,
        payload: {
          ...bookmarksAfterResponse,
          byKey: {
            ...bookmarksAfterResponse.byKey,
            ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksArray }),
          },
        },
      });

      return bookmarksArray;
    } catch (error) {
      const { Bookmarks: bookmarksOnError } = getState();

      dispatch({
        type: BOOKMARKS_LOAD_BY_IDS_FAILURE,
        payload: {
          ...bookmarksOnError,
          errors: [...(bookmarksOnError?.errors || []), error],
        },
      });

      throw error;
    }
  };
