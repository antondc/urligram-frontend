import { BookmarkDeleteApiResponse, BookmarksActions, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { linkLoadById } from 'Modules/Links/actions/linkLoadById';
import { LinksActions } from 'Modules/Links/links.types';
import { uiNotificationPush } from 'Modules/Ui/actions/uiNotificationPush';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../../index';
import { linkLoadByIdRequest } from '../../Links/actions/linkLoadByIdRequest';
import { bookmarkDeleteFailure } from './bookmarkDeleteFailure';
import { bookmarkDeleteRequest } from './bookmarkDeleteRequest';
import { bookmarkDeleteSuccess } from './bookmarkDeleteSuccess';

type BookmarkDelete = {
  bookmarkId: number;
  linkId: number;
};

export const bookmarkDelete = ({
  bookmarkId,
  linkId,
}: BookmarkDelete): AppThunk<Promise<Partial<BookmarkState>>, BookmarksActions | LinksActions> => async (
  dispatch,
  getState
) => {
  const { Bookmarks: bookmarksBeforeRequest, Links: linksBeforeRequest } = getState();

  try {
    dispatch(linkLoadByIdRequest(linksBeforeRequest));
    dispatch(bookmarkDeleteRequest(bookmarksBeforeRequest));

    const { data: bookmarkData } = await HttpClient.delete<void, BookmarkDeleteApiResponse>(
      `/users/me/bookmarks/${bookmarkId}`
    );
    await dispatch(linkLoadById(linkId));

    const { Bookmarks: bookmarksAfterResponse } = getState();

    const bookmarksToUpdate = Object.values(bookmarksAfterResponse.byKey).filter((item) => item?.linkId === linkId);

    const filteredBookmarks = bookmarksToUpdate.map((item) => ({
      ...item,
      bookmarksRelated: item.bookmarksRelated.filter((item) => item?.id !== bookmarkId),
    }));

    const filteredCurrentIds = bookmarksAfterResponse?.currentIds?.filter((item) => item !== bookmarkId);

    await dispatch(
      bookmarkDeleteSuccess({
        ...bookmarksAfterResponse,
        byKey: {
          ...bookmarksAfterResponse.byKey,
          ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: filteredBookmarks }),
          [bookmarkId]: undefined,
        },
        currentIds: filteredCurrentIds,
      })
    );

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
        },
        errors: [...(bookmarksOnError.errors || []), error],
      })
    );
    throw new Error(error);
  }
};
