import isEqual from 'lodash/isEqual';
import uniqWith from 'lodash/uniqWith';

import {
  SHARED_LOAD_SENT_FAILURE,
  SHARED_LOAD_SENT_REQUEST,
  SHARED_LOAD_SENT_SUCCESS,
  SharedActions,
  SharedBookmarksGetApiResponse,
} from 'Modules/Shared/shared.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';

export const bookmarksLoadSent = (): AppThunk<Promise<void>, SharedActions> => async (
  dispatch,
  getState
): Promise<void> => {
  try {
    const { Shared: sharedBeforeRequest } = getState();

    dispatch({
      type: SHARED_LOAD_SENT_REQUEST,
      payload: {
        ...sharedBeforeRequest,
        loading: true,
      },
    });

    const { data } = await HttpClient.get<void, SharedBookmarksGetApiResponse>(
      `/users/me/bookmarks/sent${window.location.search}`
    );
    const { Shared: sharedAfterResponse } = getState();

    const sharedBookmarksArray = data?.map((item) => item?.attributes);
    const arrayWithPreviousState = [...sharedAfterResponse.bookmarksReceived, ...sharedBookmarksArray];
    const arrayWithoutDuplicates = uniqWith(arrayWithPreviousState, isEqual);

    dispatch({
      type: SHARED_LOAD_SENT_SUCCESS,
      payload: {
        ...sharedAfterResponse,
        bookmarksSent: arrayWithoutDuplicates,
        loading: false,
      },
    });

    return;
  } catch (error) {
    const { Shared: sharedOnError } = getState();

    dispatch({
      type: SHARED_LOAD_SENT_FAILURE,
      payload: {
        ...sharedOnError,
        loading: false,
        errors: [...(sharedOnError.errors || []), error],
      },
    });
  }
};
