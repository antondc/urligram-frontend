import { Dispatch } from 'redux';

import { bookmarkCreateFailure } from 'Modules/Bookmarks/actions/bookmarkCreateFailure';
import { bookmarkCreateSuccess } from 'Modules/Bookmarks/actions/bookmarkCreateSuccess';
import { BookmarkCreateRequest, BookmarkCreateResponse, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { linkLoadById } from 'Modules/Links/actions/linkLoadById';
import { linkLoadByIdRequest } from 'Modules/Links/actions/linkLoadByIdRequest';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../../index';
import { RootState } from '../../rootType';
import { bookmarkCreateRequest } from './bookmarkCreateRequest';

export const bookmarkCreate = ({
  bookmarkId,
  linkId,
  title,
  url,
  isPrivate,
  tags,
}: BookmarkCreateRequest): AppThunk<Promise<BookmarkState>> => async (
  dispatch: Dispatch<any>,
  getState: () => RootState
) => {
  const { Bookmarks } = getState();
  try {
    if (linkId) dispatch(linkLoadByIdRequest(linkId));
    dispatch(bookmarkCreateRequest(bookmarkId));

    const { data: bookmarkData }: BookmarkCreateResponse = await HttpClient.post('/users/me/bookmarks', {
      title,
      url,
      isPrivate,
      tags,
    });
    await dispatch(bookmarkCreateSuccess({ originalBookmarkId: bookmarkId, bookmark: bookmarkData.attributes }));
    await dispatch(linkLoadById(bookmarkData?.attributes?.linkId));

    return bookmarkData?.attributes;
  } catch (error) {
    await dispatch(bookmarkCreateFailure([...Bookmarks.errors, error]));
  }
};
