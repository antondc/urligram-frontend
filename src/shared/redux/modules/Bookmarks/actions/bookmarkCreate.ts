import { bookmarkCreateFailure } from 'Modules/Bookmarks/actions/bookmarkCreateFailure';
import {
  BOOKMARK_CREATE_SUCCESS,
  BookmarkCreateApiRequest,
  BookmarkCreateApiResponse,
  BookmarksActions,
  BookmarkState,
} from 'Modules/Bookmarks/bookmarks.types';
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

    console.log('=======');
    console.log('bookmarkData:');
    console.log(JSON.stringify(bookmarkData, null, 4));
    console.log('=======');

    const { Bookmarks: bookmarksAfterResponse } = getState();

    const bookmarksToUpdate = Object.values(bookmarksAfterResponse.byKey).filter(
      (item) => item?.linkId === bookmarkData?.attributes?.linkId
    );
    const bookmarksWithNewBookmark = bookmarksToUpdate.map((item) => ({
      ...item,
      bookmarksRelated: [
        ...(item?.bookmarksRelated || []),
        {
          id: bookmarkData?.attributes?.id,
          title: bookmarkData?.attributes?.title,
          userId: bookmarkData?.attributes?.userId,
        },
      ],
    }));

    dispatch({
      type: BOOKMARK_CREATE_SUCCESS,
      payload: {
        ...bookmarksAfterResponse,
        byKey: {
          ...bookmarksAfterResponse.byKey,
          ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksWithNewBookmark }),
          [bookmarkData?.attributes?.id]: bookmarkData?.attributes,
        },
      },
    });
    // await dispatch(bookmarkLoadById({ bookmarkId: bookmarkData?.attributes?.id }));

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
