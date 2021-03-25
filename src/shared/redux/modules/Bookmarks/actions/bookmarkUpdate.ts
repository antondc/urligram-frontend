import { bookmarkUpdateFailure } from 'Modules/Bookmarks/actions/bookmarkUpdateFailure';
import { bookmarkUpdateSuccess } from 'Modules/Bookmarks/actions/bookmarkUpdateSuccess';
import {
  BookmarksActions,
  BookmarkState,
  BookmarkUpdateRequest,
  BookmarkUpdateResponse,
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
}: BookmarkUpdateRequest): AppThunk<Promise<BookmarkState>, BookmarksActions> => async (
  dispatch,
  getState
): Promise<BookmarkState> => {
  const { Bookmarks } = getState();
  try {
    dispatch(bookmarkUpdateRequest());

    const { data: bookmarkData } = await HttpClient.put<any, BookmarkUpdateResponse>(
      `/users/me/bookmarks/${bookmarkId}`,
      {
        order,
        title,
        isPrivate,
        tags,
      }
    );
    await dispatch(bookmarkUpdateSuccess({ bookmark: bookmarkData.attributes }));

    return bookmarkData?.attributes;
  } catch (error) {
    await dispatch(bookmarkUpdateFailure([...Bookmarks.errors, error]));

    throw new Error(error);
  }
};
