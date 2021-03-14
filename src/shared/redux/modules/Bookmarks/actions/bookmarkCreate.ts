import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { bookmarkCreateFailure } from 'Modules/Bookmarks/actions/bookmarkCreateFailure';
import { bookmarkCreateSuccess } from 'Modules/Bookmarks/actions/bookmarkCreateSuccess';
import { BookmarkCreateRequest, BookmarkCreateResponse } from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { bookmarkCreateRequest } from './bookmarkCreateRequest';

export const bookmarkCreate = ({
  title,
  url,
  isPrivate,
  tags,
}: BookmarkCreateRequest): ThunkAction<any, any, any, Action> => async (dispatch: Dispatch) => {
  try {
    dispatch(bookmarkCreateRequest());
    const { data: bookmarkData }: BookmarkCreateResponse = await HttpClient.post('/users/me/bookmarks', {
      title,
      url,
      isPrivate,
      tags,
    });
    dispatch(bookmarkCreateSuccess(bookmarkData.attributes));
  } catch (err) {
    await dispatch(bookmarkCreateFailure(err));
    throw new Error(err);
  }

  return;
};
