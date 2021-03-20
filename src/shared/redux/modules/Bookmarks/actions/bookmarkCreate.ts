import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { bookmarkCreateFailure } from 'Modules/Bookmarks/actions/bookmarkCreateFailure';
import { bookmarkCreateSuccess } from 'Modules/Bookmarks/actions/bookmarkCreateSuccess';
import { BookmarkCreateRequest, BookmarkCreateResponse } from 'Modules/Bookmarks/bookmarks.types';
import { linkLoadById } from 'Modules/Links/actions/linkLoadById';
import { linkLoadByIdRequest } from 'Modules/Links/actions/linkLoadByIdRequest';
import HttpClient from 'Services/HttpClient';
import { bookmarkCreateRequest } from './bookmarkCreateRequest';

export const bookmarkCreate = ({
  linkId,
  title,
  url,
  isPrivate,
  tags,
}: BookmarkCreateRequest): ThunkAction<any, any, any, Action> => async (dispatch: Dispatch<any>) => {
  try {
    if (linkId) dispatch(linkLoadByIdRequest(linkId));

    dispatch(bookmarkCreateRequest());
    const { data: bookmarkData }: BookmarkCreateResponse = await HttpClient.post('/users/me/bookmarks', {
      title,
      url,
      isPrivate,
      tags,
    });

    await dispatch(bookmarkCreateSuccess(bookmarkData.attributes));
    await dispatch(linkLoadById(bookmarkData?.attributes?.linkId));
  } catch (err) {
    await dispatch(bookmarkCreateFailure(err));

    throw new Error(err);
  }

  return;
};
