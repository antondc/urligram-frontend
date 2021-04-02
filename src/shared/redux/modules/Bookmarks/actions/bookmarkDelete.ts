import { BookmarkDeleteApiResponse, BookmarksActions, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { linkLoadById } from 'Modules/Links/actions/linkLoadById';
import { LinksActions } from 'Modules/Links/links.types';
import { uiNotificationPush } from 'Modules/Ui/actions/uiNotificationPush';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../../index';
import { linkLoadByIdRequest } from '../../Links/actions/linkLoadByIdRequest';
import { usersLoad } from '../../Users/actions/usersLoad';
import { bookmarkDeleteFailure } from './bookmarkDeleteFailure';
import { bookmarkDeleteRequest } from './bookmarkDeleteRequest';
import { bookmarkDeleteSuccess } from './bookmarkDeleteSuccess';

type BookmarkDelete = {
  bookmarkId: number;
  linkId: number;
  userId: string;
};

export const bookmarkDelete = ({
  bookmarkId,
  linkId,
  userId,
}: BookmarkDelete): AppThunk<Promise<Partial<BookmarkState>>, BookmarksActions | LinksActions> => async (
  dispatch,
  getState
) => {
  const { Bookmarks: bookmarkBeforeRequest, Links: linksBeforeRequest } = getState();
  try {
    await dispatch(
      linkLoadByIdRequest({
        ...linksBeforeRequest,
        byKey: {
          ...linksBeforeRequest.byKey,
          [linkId]: {
            ...linksBeforeRequest.byKey[linkId],
            loading: true,
          },
        },
      })
    );
    await dispatch(
      bookmarkDeleteRequest({
        ...bookmarkBeforeRequest,
        byKey: {
          ...bookmarkBeforeRequest.byKey,
          [bookmarkId]: {
            ...bookmarkBeforeRequest.byKey[bookmarkId],
            loading: true,
          },
        },
      })
    );

    const { data: bookmarkData } = await HttpClient.delete<void, BookmarkDeleteApiResponse>(
      `/users/me/bookmarks/${bookmarkId}`
    );
    const { Bookmarks: bookmarksAfterResponse } = getState();

    const bookmarksToUpdate = Object.values(bookmarksAfterResponse.byKey).filter((item) => item?.linkId === linkId);

    const bookmarksWithoutUser = bookmarksToUpdate.map((item) => ({
      ...item,
      users: item.users.filter((item) => item !== userId),
    }));

    const filteredCurrentIds = bookmarksAfterResponse?.currentIds?.filter((item) => item !== bookmarkId);

    await dispatch(
      bookmarkDeleteSuccess({
        ...bookmarksAfterResponse,
        byKey: {
          ...bookmarksAfterResponse.byKey,
          ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksWithoutUser }),
          [bookmarkId]: undefined,
        },
        currentIds: filteredCurrentIds,
      })
    );

    await dispatch(linkLoadById(linkId));

    await dispatch(
      uiNotificationPush({
        bookmarkId: bookmarkId,
        type: 'bookmark-deleted',
        style: 'alert',
        status: 'pending',
      })
    );

    return bookmarkData?.attributes;
  } catch (error) {
    const { Bookmarks: bookmarksOnError } = getState();
    await dispatch(
      bookmarkDeleteFailure({
        ...bookmarksOnError,
        byKey: {
          ...bookmarksOnError.byKey,
          [bookmarkId]: {
            ...bookmarksOnError.byKey[bookmarkId],
            loading: false,
          },
        },
        errors: [...bookmarksOnError.errors, error],
      })
    );
  }
};
