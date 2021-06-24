import {
  SHARED_SEND_FAILURE,
  SHARED_SEND_REQUEST,
  SHARED_SEND_SUCCESS,
  SharedActions,
  SharedSentGetApiResponse,
} from 'Modules/Shared/shared.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { bookmarksLoadSuccess } from '../../Bookmarks/actions/bookmarksLoadSuccess';
import { BookmarksActions } from '../../Bookmarks/bookmarks.types';

export const bookmarkSendCreate = ({
  bookmarkId,
  userId,
}: {
  bookmarkId: number;
  userId: string;
}): AppThunk<Promise<void>, SharedActions | BookmarksActions> => async (dispatch, getState): Promise<void> => {
  try {
    const { Shared: sharedBeforeRequest } = getState();

    dispatch({
      type: SHARED_SEND_REQUEST,
      payload: sharedBeforeRequest,
    });

    const { data } = await HttpClient.post<void, SharedSentGetApiResponse>(
      `/users/me/bookmarks/${bookmarkId}/users/${userId}`
    );
    const { Shared: sharedAfterResponse, Bookmarks: bookmarksAfterApi } = getState();

    const bookmarkSentToUpdated = [
      ...bookmarksAfterApi.byKey[data?.attributes?.bookmarkId].bookmarkSentTo,
      {
        senderId: data.attributes.userFrom,
        receiverId: data.attributes.userTo,
        viewed: false,
      },
      data.attributes.userTo,
    ];

    dispatch(
      bookmarksLoadSuccess({
        ...bookmarksAfterApi,
        byKey: {
          ...bookmarksAfterApi.byKey,
          [data?.attributes?.bookmarkId]: {
            ...bookmarksAfterApi.byKey[data?.attributes?.bookmarkId],
            bookmarkSentTo: bookmarkSentToUpdated,
          },
        },
      })
    );

    dispatch({
      type: SHARED_SEND_SUCCESS,
      payload: {
        ...sharedAfterResponse,
        bookmarksSent: [
          ...sharedAfterResponse.bookmarksSent,
          {
            bookmarkId: data?.attributes?.bookmarkId,
            senderId: data?.attributes?.userFrom,
            receiverId: userId,
            viewed: false,
          },
        ],
      },
    });

    return;
  } catch (error) {
    const { Shared: sharedOnError } = getState();

    dispatch({
      type: SHARED_SEND_FAILURE,
      payload: sharedOnError,
    });
  }
};
