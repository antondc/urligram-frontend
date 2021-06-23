import {
  SHARED_VIEWED_REQUEST,
  SHARED_VIEWED_SUCCESS,
  SharedActions,
  SharedViewedGetApiResponse,
} from 'Modules/Shared/shared.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { bookmarksLoadSuccess } from '../../Bookmarks/actions/bookmarksLoadSuccess';
import { BookmarksActions } from '../../Bookmarks/bookmarks.types';

export const bookmarkViewed = (bookmarkId: number): AppThunk<Promise<void>, SharedActions | BookmarksActions> => async (
  dispatch,
  getState
): Promise<void> => {
  try {
    const { Shared: sharedBeforeRequest } = getState();

    dispatch({
      type: SHARED_VIEWED_REQUEST,
      payload: sharedBeforeRequest,
    });

    const { data } = await HttpClient.put<void, SharedViewedGetApiResponse>(
      `/users/me/bookmarks/received/${bookmarkId}`
    );
    const { Shared: sharedAfterResponse, Bookmarks: bookmarksAfterApi } = getState();

    const bookmarkReceivedFromUpdated = bookmarksAfterApi.byKey[data?.attributes?.bookmarkId].bookmarkReceivedFrom?.map(
      (item) => ({
        ...item,
        viewed: true,
      })
    );

    dispatch(
      bookmarksLoadSuccess({
        ...bookmarksAfterApi,
        byKey: {
          ...bookmarksAfterApi.byKey,
          [data?.attributes?.bookmarkId]: {
            ...bookmarksAfterApi.byKey[data?.attributes?.bookmarkId],
            bookmarkReceivedFrom: bookmarkReceivedFromUpdated,
          },
        },
      })
    );

    dispatch({
      type: SHARED_VIEWED_SUCCESS,
      payload: sharedAfterResponse,
    });

    return;
  } catch (error) {}
};
