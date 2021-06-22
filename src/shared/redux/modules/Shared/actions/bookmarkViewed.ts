import {
  SHARED_VIEWED_FAILURE,
  SHARED_VIEWED_REQUEST,
  SHARED_VIEWED_SUCCESS,
  SharedActions,
  SharedViewedGetApiResponse,
} from 'Modules/Shared/shared.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';

export const bookmarkViewed = (bookmarkId: number): AppThunk<Promise<void>, SharedActions> => async (
  dispatch,
  getState
): Promise<void> => {
  try {
    const { Shared: sharedBeforeRequest } = getState();

    dispatch({
      type: SHARED_VIEWED_REQUEST,
      payload: {
        ...sharedBeforeRequest,
        loading: true,
      },
    });

    const { data } = await HttpClient.put<void, SharedViewedGetApiResponse>(
      `/users/me/bookmarks/received/${bookmarkId}`
    );
    const { Shared: sharedAfterResponse } = getState();

    const sharedBookmarksUpdated = sharedAfterResponse.bookmarksReceived.map((item) => {
      if (item.bookmarkId === data.attributes.bookmarkId) {
        return {
          ...item,
          viewed: true,
        };
      }

      return item;
    });

    dispatch({
      type: SHARED_VIEWED_SUCCESS,
      payload: {
        ...sharedAfterResponse,
        bookmarksReceived: sharedBookmarksUpdated,
        loading: false,
      },
    });

    return;
  } catch (error) {
    const { Shared: sharedOnError } = getState();

    dispatch({
      type: SHARED_VIEWED_FAILURE,
      payload: {
        ...sharedOnError,
        loading: false,
        errors: [...(sharedOnError.errors || []), error],
      },
    });
  }
};
