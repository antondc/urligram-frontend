import {
  SHARED_LOAD_RECEIVED_FAILURE,
  SHARED_LOAD_RECEIVED_REQUEST,
  SHARED_LOAD_RECEIVED_SUCCESS,
  SharedActions,
} from 'Modules/Shared/shared.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { bookmarksLoadSuccess } from '../../Bookmarks/actions/bookmarksLoadSuccess';
import { BookmarksActions, BookmarksGetApiResponse, BookmarkState } from '../../Bookmarks/bookmarks.types';

export const bookmarksLoadReceived = (): AppThunk<Promise<void>, SharedActions | BookmarksActions> => async (
  dispatch,
  getState
): Promise<void> => {
  try {
    const { Shared: sharedBeforeRequest } = getState();

    dispatch({
      type: SHARED_LOAD_RECEIVED_REQUEST,
      payload: {
        ...sharedBeforeRequest,
        loading: true,
      },
    });

    const { data } = await HttpClient.get<void, BookmarksGetApiResponse>(
      `/users/me/bookmarks/received${window.location.search}`
    );
    const { Shared: sharedAfterResponse, Bookmarks: bookmarksAfterApi } = getState();
    const bookmarksArray = data?.map((item) => item.attributes);
    const bookmarkIdsArray = data?.map((item) => item.attributes?.id);

    dispatch(
      bookmarksLoadSuccess({
        ...bookmarksAfterApi,
        byKey: {
          ...bookmarksAfterApi.byKey,
          ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksArray }),
        },
      })
    );

    dispatch({
      type: SHARED_LOAD_RECEIVED_SUCCESS,
      payload: {
        ...sharedAfterResponse,
        bookmarksReceived: bookmarkIdsArray,
        loading: false,
      },
    });

    return;
  } catch (error) {
    const { Shared: sharedOnError } = getState();

    dispatch({
      type: SHARED_LOAD_RECEIVED_FAILURE,
      payload: {
        ...sharedOnError,
        loading: false,
        errors: [...(sharedOnError.errors || []), error],
      },
    });
  }
};
