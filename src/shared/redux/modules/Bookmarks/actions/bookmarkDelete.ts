import { BookmarkDeleteApiResponse, BookmarksActions, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { LinksActions } from 'Modules/Links/links.types';
import { uiNotificationPush } from 'Modules/Ui/actions/uiNotificationPush';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../../index';
import { linkLoadByIdRequest } from '../../Links/actions/linkLoadByIdRequest';
import { linkLoadByIdSuccess } from '../../Links/actions/linkLoadByIdSuccess';
import { bookmarkDeleteFailure } from './bookmarkDeleteFailure';
import { bookmarkDeleteRequest } from './bookmarkDeleteRequest';
import { bookmarkDeleteSuccess } from './bookmarkDeleteSuccess';

type BookmarkDelete = {
  bookmarkId: number;
  linkId: number;
};

export const bookmarkDelete =
  ({
    bookmarkId,
    linkId,
  }: BookmarkDelete): AppThunk<Promise<Partial<BookmarkState>>, BookmarksActions | LinksActions> =>
  async (dispatch, getState) => {
    const { Bookmarks: bookmarksBeforeRequest, Links: linksBeforeRequest } = getState();

    try {
      dispatch(linkLoadByIdRequest(linksBeforeRequest));
      dispatch(bookmarkDeleteRequest(bookmarksBeforeRequest));

      const { data: bookmarkData } = await HttpClient.delete<void, BookmarkDeleteApiResponse>(
        `/users/me/bookmarks/${bookmarkId}`
      );

      const { Bookmarks: bookmarksAfterResponse, Links: linksAfterResponse } = getState();

      const filteredBookmarksRelated = linksAfterResponse?.byKey?.[linkId]?.bookmarksRelated?.filter(
        (item) => item.id !== bookmarkId
      );
      const linkWithBookmarksRelatedUpdated = {
        ...linksAfterResponse.byKey[linkId],
        bookmarksRelated: filteredBookmarksRelated,
      };
      const filteredAllIds = linksAfterResponse?.allIds?.filter((item) => item !== linkId);
      const updatedLink = !!filteredBookmarksRelated?.length ? linkWithBookmarksRelatedUpdated : undefined;
      const updatedAllLinksIds = !!filteredBookmarksRelated?.length ? linksAfterResponse?.allIds : filteredAllIds;

      await dispatch(
        linkLoadByIdSuccess({
          ...linksAfterResponse,
          byKey: {
            ...linksAfterResponse?.byKey,
            [linkId]: updatedLink,
          },
          allIds: updatedAllLinksIds,
        })
      );
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

      throw error;
    }
  };
