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
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../../index';
import { bookmarkCreateRequest } from './bookmarkCreateRequest';

export const bookmarkCreate = ({
  title,
  url,
  isPrivate,
  tags,
}: BookmarkCreateApiRequest): AppThunk<Promise<BookmarkState>, BookmarksActions | LinksActions> => async (
  dispatch,
  getState
) => {
  const { Bookmarks: bookmarksBeforeRequest } = getState();

  try {
    dispatch(bookmarkCreateRequest(bookmarksBeforeRequest));

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

    dispatch(
      bookmarkCreateSuccess({
        ...bookmarksAfterResponse,
        byKey: {
          ...bookmarksAfterResponse.byKey,
          ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksWithNewUser }),
          [bookmarkData?.attributes?.id]: {
            ...bookmarksAfterResponse.byKey[bookmarkData?.attributes?.id],
            ...bookmarkData?.attributes,
            bookmarksRelated: [
              ...(bookmarksAfterResponse.byKey[bookmarkData?.attributes?.id]?.bookmarksRelated || []),
              {
                id: bookmarkData?.attributes?.id,
                userId: bookmarkData?.attributes?.userId,
                title: bookmarkData?.attributes?.title,
              },
            ],
          },
        },
      })
    );
    await dispatch(linkLoadById(bookmarkData?.attributes?.linkId));

    dispatch(
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
    dispatch(
      bookmarkCreateFailure({
        ...bookmarksOnError,
        errors: [...(bookmarksOnError.errors || []), error],
      })
    );

    throw new Error(error);
  }
};
