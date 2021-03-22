import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { bookmarkUpdateFailure } from 'Modules/Bookmarks/actions/bookmarkUpdateFailure';
import { bookmarkUpdateSuccess } from 'Modules/Bookmarks/actions/bookmarkUpdateSuccess';
import { BookmarkUpdateRequest, BookmarkUpdateResponse } from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { bookmarkUpdateRequest } from './bookmarkUpdateRequest';

export const bookmarkUpdate = ({
  bookmarkId,
  order,
  title,
  isPrivate,
  tags,
}: BookmarkUpdateRequest): ThunkAction<any, any, any, Action> => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(bookmarkUpdateRequest());

    const { data: bookmarkData }: BookmarkUpdateResponse = await HttpClient.put(`/users/me/bookmarks/${bookmarkId}`, {
      order,
      title,
      isPrivate,
      tags,
    });
    await dispatch(bookmarkUpdateSuccess({ bookmark: bookmarkData.attributes }));
  } catch (error) {
    await dispatch(bookmarkUpdateFailure({ error }));

    throw new Error(error);
  }

  return;
};
