import { bookmarkCreateFailure } from 'Modules/Bookmarks/actions/bookmarkCreateFailure';
import { bookmarkCreateSuccess } from 'Modules/Bookmarks/actions/bookmarkCreateSuccess';
import {
  BookmarkCreateApiRequest,
  BookmarkCreateApiResponse,
  BookmarksActions,
  BookmarkState,
} from 'Modules/Bookmarks/bookmarks.types';
import { linkLoadById } from 'Modules/Links/actions/linkLoadById';
import { LinksActions } from 'Modules/Links/links.types';
import { uiNotificationPush } from 'Modules/Ui/actions/uiNotificationPush';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../../index';
import { bookmarkCreateRequest } from './bookmarkCreateRequest';

export const bookmarkCreate = ({
  title,
  url,
  isPrivate,
  tags,
  bookmarkId,
}: BookmarkCreateApiRequest): AppThunk<Promise<BookmarkState>, BookmarksActions | LinksActions> => async (
  dispatch,
  getState
) => {
  try {
    const { Bookmarks: bookmarksBeforeRequest } = getState();

    dispatch(
      bookmarkCreateRequest({
        ...bookmarksBeforeRequest,
        byKey: {
          ...bookmarksBeforeRequest.byKey,
          [bookmarkId]: {
            ...bookmarksBeforeRequest.byKey[bookmarkId],
            loading: true,
          },
        },
      })
    );

    const { data: bookmarkData } = await HttpClient.post<void, BookmarkCreateApiResponse>('/users/me/bookmarks', {
      title,
      url,
      isPrivate,
      tags,
    });
    const { Bookmarks: bookmarksAfterResponse } = getState();

    const bookmarksToUpdate = Object.values(bookmarksAfterResponse.byKey).filter(
      (item) => item?.linkId === bookmarkData?.attributes?.linkId
    );
    const bookmarksWithNewUser = bookmarksToUpdate.map((item) => ({
      ...item,
      users: [...(item?.users || []), bookmarkData.attributes.userId],
    }));

    await dispatch(
      bookmarkCreateSuccess({
        ...bookmarksAfterResponse,
        byKey: {
          ...bookmarksAfterResponse.byKey,
          ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksWithNewUser }),
          [bookmarkId]: {
            ...bookmarksAfterResponse.byKey[bookmarkId],
            users: [...(bookmarksAfterResponse.byKey[bookmarkId]?.users || []), bookmarkData?.attributes?.userId],
            loading: false,
          },
          [bookmarkData?.attributes?.id]: bookmarkData?.attributes,
        },
      })
    );
    await dispatch(linkLoadById(bookmarkData?.attributes?.linkId));
    await dispatch(
      uiNotificationPush({
        bookmarkId: bookmarkData.attributes.id,
        type: 'bookmark-grabbed',
        style: 'success',
        status: 'pending',
      })
    );

    return bookmarkData?.attributes;
  } catch (error) {
    const { Bookmarks: bookmarksOnError } = getState();

    await dispatch(
      bookmarkCreateFailure({
        ...bookmarksOnError,
        [bookmarkId]: {
          ...bookmarksOnError?.byKey[bookmarkId],
          loading: false,
        },
        errors: [...bookmarksOnError.errors, error],
      })
    );
  }
};
