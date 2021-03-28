import { bookmarkDeleteFailure } from 'Modules/Bookmarks/actions/bookmarkDeleteFailure';
import { bookmarkDeleteSuccess } from 'Modules/Bookmarks/actions/bookmarkDeleteSuccess';
import { BookmarkDeleteApiResponse, BookmarksActions, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { linkLoadById } from 'Modules/Links/actions/linkLoadById';
import { LinksActions } from 'Modules/Links/links.types';
import { uiNotificationPush } from 'Modules/Ui/actions/uiNotificationPush';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../../index';

export const bookmarkDelete = (
  bookmarkId: number
): AppThunk<Promise<Partial<BookmarkState>>, BookmarksActions | LinksActions> => async (dispatch, getState) => {
  const { Bookmarks: bookmarkBeforeRequest } = getState();
  try {
    const bookmarkLinkId = bookmarkBeforeRequest?.byKey[bookmarkId]?.linkId;
    const { data: bookmarkData } = await HttpClient.delete<void, BookmarkDeleteApiResponse>(
      `/users/me/bookmarks/${bookmarkId}`
    );
    const { Bookmarks: bookmarksAfterResponse } = getState();

    const filteredCurrentIds = bookmarksAfterResponse.currentIds.filter((item) => item !== bookmarkId);

    await dispatch(
      bookmarkDeleteSuccess({
        ...bookmarksAfterResponse,
        byKey: {
          ...bookmarksAfterResponse.byKey,
          [bookmarkId]: undefined,
        },
        currentIds: filteredCurrentIds,
      })
    );
    await dispatch(linkLoadById(bookmarkLinkId));
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
        errors: [...bookmarksOnError.errors, error],
      })
    );
  }
};
