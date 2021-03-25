import { bookmarkCreateFailure } from 'Modules/Bookmarks/actions/bookmarkCreateFailure';
import { bookmarkCreateSuccess } from 'Modules/Bookmarks/actions/bookmarkCreateSuccess';
import {
  BookmarkCreateApiRequest,
  BookmarkCreateApiResponse,
  BookmarksActions,
  BookmarkState,
} from 'Modules/Bookmarks/bookmarks.types';
import { linkLoadById } from 'Modules/Links/actions/linkLoadById';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../../index';
import { LinksActions } from '../../Links/links.types';

export const bookmarkCreate = ({
  title,
  url,
  isPrivate,
  tags,
}: BookmarkCreateApiRequest): AppThunk<Promise<BookmarkState>, BookmarksActions | LinksActions> => async (
  dispatch,
  getState
) => {
  try {
    const { data: bookmarkData } = await HttpClient.post<void, BookmarkCreateApiResponse>('/users/me/bookmarks', {
      title,
      url,
      isPrivate,
      tags,
    });
    const { Bookmarks: bookmarksAfterResponse } = getState();
    const bookmarksToUpdate = Object.values(bookmarksAfterResponse.byKey).filter(
      (item) => item.linkId === bookmarkData?.attributes?.linkId
    );
    const bookmarksWithNewUser = bookmarksToUpdate.map((item) => ({
      ...item,
      users: [...item.users, bookmarkData.attributes.userId],
    }));

    await dispatch(
      bookmarkCreateSuccess({
        ...bookmarksAfterResponse,
        byKey: {
          ...bookmarksAfterResponse.byKey,
          ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksWithNewUser }),
          [bookmarkData.attributes?.id]: {
            ...bookmarkData.attributes,
          },
        },
      })
    );
    await dispatch(linkLoadById(bookmarkData?.attributes?.linkId));

    return bookmarkData?.attributes;
  } catch (error) {
    const { Bookmarks: bookmarksOnError } = getState();
    await dispatch(
      bookmarkCreateFailure({
        ...bookmarksOnError,
        errors: [...bookmarksOnError.errors, error],
      })
    );
  }
};
