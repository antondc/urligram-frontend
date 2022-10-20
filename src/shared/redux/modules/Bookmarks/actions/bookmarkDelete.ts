import { BookmarkGetApiResponse, BookmarksActions, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { uiNotificationPush } from 'Modules/Ui/actions/uiNotificationPush';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from '@antoniodcorrea/utils';
import { AppThunk } from '../../../index';
import { bookmarkDeleteFailure } from './bookmarkDeleteFailure';
import { bookmarkDeleteRequest } from './bookmarkDeleteRequest';
import { bookmarkDeleteSuccess } from './bookmarkDeleteSuccess';

type BookmarkDelete = {
  bookmarkId: number;
  linkId: number;
};

export interface BookmarkDeleteApiResponse {
  data: {
    attributes: {
      id: number;
      linkId: number;
    };
  };
}

export const bookmarkDelete =
  ({ bookmarkId, linkId }: BookmarkDelete): AppThunk<Promise<Partial<BookmarkState>>, BookmarksActions> =>
  async (dispatch, getState) => {
    const { Bookmarks: bookmarksBeforeRequest } = getState();

    try {
      dispatch(bookmarkDeleteRequest(bookmarksBeforeRequest));

      const { data: deletedBookmarkData } = await HttpClient.delete<void, BookmarkDeleteApiResponse>(
        `/users/me/bookmarks/${bookmarkId}`
      );

      /*
        As we are deleting a bookmark, we need to know if there are more bookmarks for this link
        Thus, we try to retrieve it with /bookmarks/link/:linkid/user/me endpoint
        This endpoint will return the user's bookmark for this link, or the latest bookmark for this link
        If users's bookmark was the only one, endpoint will return Error 404.
        We branch this logic with a try/catch
      */
      try {
        const { data: defaultBookmarkData } = await HttpClient.get<any, BookmarkGetApiResponse>(
          `/bookmarks/link/${linkId}/user/me`
        );
        const finalBookmarkData = defaultBookmarkData?.attributes;
        const { Bookmarks: bookmarksAfterResponse } = getState();

        const bookmarksToUpdate = Object.values(bookmarksAfterResponse.byKey).filter((item) => item?.linkId === linkId);
        const bookmarksUpdated = bookmarksToUpdate
          .map((item) => ({
            ...item,
            bookmarksRelated: item.bookmarksRelated.filter((item) => item?.id !== bookmarkId),
          }))
          .map((item) => (item?.id === bookmarkId ? finalBookmarkData : item));
        const filteredCurrentIds = bookmarksAfterResponse?.currentIds?.map((item) =>
          item === bookmarkId ? finalBookmarkData.id : item
        );

        await dispatch(
          bookmarkDeleteSuccess({
            ...bookmarksAfterResponse,
            byKey: {
              ...bookmarksAfterResponse.byKey,
              ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksUpdated }),
              [bookmarkId]: undefined,
            },
            currentIds: filteredCurrentIds,
          })
        );
      } catch {
        /*
          Mentioned case of /bookmarks/link/:linkid/user/me returning Error 404
          Remove bookmark from store
        */
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
      }

      await dispatch(
        uiNotificationPush({
          bookmarkId: bookmarkId,
          type: 'bookmark-deleted',
          style: 'alert',
          status: 'pending',
        })
      );

      return deletedBookmarkData?.attributes;
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
