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
import { USERS_LOAD_SUCCEED, UsersActions } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../../index';
import { bookmarkCreateRequest } from './bookmarkCreateRequest';

export const bookmarkCreate = ({
  title,
  url,
  isPrivate,
  tags,
}: BookmarkCreateApiRequest): AppThunk<
  Promise<BookmarkState>,
  BookmarksActions | LinksActions | UsersActions
> => async (dispatch, getState) => {
  const { Bookmarks: bookmarksBeforeRequest } = getState();

  try {
    dispatch(bookmarkCreateRequest(bookmarksBeforeRequest));

    const { data: bookmarkData } = await HttpClient.post<void, BookmarkCreateApiResponse>('/users/me/bookmarks', {
      title,
      url,
      isPrivate,
      tags,
    });

    const { Bookmarks: bookmarksAfterResponse, Users: usersAfterResponse } = getState();

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
        currentIds: [bookmarkData?.attributes?.id, ...(bookmarksAfterResponse?.currentIds || [])],
      },
    });

    dispatch({
      type: USERS_LOAD_SUCCEED,
      payload: {
        ...usersAfterResponse,
        byKey: {
          ...usersAfterResponse.byKey,
          [bookmarkData?.attributes?.userId]: {
            ...usersAfterResponse.byKey[bookmarkData?.attributes?.userId],
            bookmarksIds: [
              bookmarkData?.attributes?.id,
              ...(usersAfterResponse.byKey[bookmarkData?.attributes?.userId]?.bookmarksIds || []),
            ],
          },
        },
      },
    });

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
