import { bookmarkUpdateFailure } from 'Modules/Bookmarks/actions/bookmarkUpdateFailure';
import { bookmarkUpdateSuccess } from 'Modules/Bookmarks/actions/bookmarkUpdateSuccess';
import {
  BookmarksActions,
  BookmarkState,
  BookmarkUpdateApiRequest,
  BookmarkUpdateApiResponse,
} from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { bookmarkUpdateRequest } from './bookmarkUpdateRequest';

export const bookmarkUpdate = ({
  bookmarkId,
  order,
  title,
  isPrivate,
  tags,
}: BookmarkUpdateApiRequest): AppThunk<Promise<BookmarkState>, BookmarksActions> => async (
  dispatch,
  getState
): Promise<BookmarkState> => {
  const { Bookmarks: bookmarksBeforeRequest } = getState();
  try {
    dispatch(
      bookmarkUpdateRequest({
        ...bookmarksBeforeRequest,
        loading: true,
      })
    );

    const { data: bookmarkData } = await HttpClient.put<any, BookmarkUpdateApiResponse>(
      `/users/me/bookmarks/${bookmarkId}`,
      {
        order,
        title,
        isPrivate,
        tags,
      }
    );
    const { Bookmarks: bookmarksAfterResponse } = getState();

    await dispatch(
      bookmarkUpdateSuccess({
        ...bookmarksAfterResponse,
        byKey: {
          ...bookmarksAfterResponse.byKey,
          [bookmarkData.attributes.id]: bookmarkData.attributes,
        },
        loading: false,
      })
    );

    return bookmarkData?.attributes;
  } catch (error) {
    const { Bookmarks: bookmarksOnError } = getState();

    await dispatch(
      bookmarkUpdateFailure({
        ...bookmarksOnError,
        errors: [...bookmarksOnError.errors, error],
        loading: false,
      })
    );

    throw new Error(error);
  }
};
