import { bookmarkCreateFailure } from 'Modules/Bookmarks/actions/bookmarkCreateFailure';
import { bookmarkCreateSuccess } from 'Modules/Bookmarks/actions/bookmarkCreateSuccess';
import {
  BookmarkCreateRequest,
  BookmarkCreateResponse,
  BookmarksActions,
  BookmarkState,
} from 'Modules/Bookmarks/bookmarks.types';
import { linkLoadById } from 'Modules/Links/actions/linkLoadById';
import { linkLoadByIdRequest } from 'Modules/Links/actions/linkLoadByIdRequest';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../../index';
import { LinksActionsTypes } from '../../Links/links.types';
import { bookmarkCreateRequest } from './bookmarkCreateRequest';

export const bookmarkCreate = ({
  linkId,
  title,
  url,
  isPrivate,
  tags,
}: BookmarkCreateRequest): AppThunk<Promise<BookmarkState>, BookmarksActions | LinksActionsTypes> => async (
  dispatch,
  getState
) => {
  const { Bookmarks, Links } = getState();
  try {
    if (linkId) {
      dispatch(
        linkLoadByIdRequest({
          ...Links,
          byKey: {
            ...Links.byKey,
            [linkId]: {
              ...Links.byKey[linkId],
              loading: true,
            },
          },
        })
      );
    }

    dispatch(bookmarkCreateRequest());

    const { data: bookmarkData } = await HttpClient.post<void, BookmarkCreateResponse>('/users/me/bookmarks', {
      title,
      url,
      isPrivate,
      tags,
    });

    await dispatch(
      bookmarkCreateSuccess({
        byKey: {
          [bookmarkData.attributes?.id]: bookmarkData.attributes,
        },
      })
    );
    await dispatch(linkLoadById(bookmarkData?.attributes?.linkId));

    return bookmarkData?.attributes;
  } catch (error) {
    await dispatch(bookmarkCreateFailure([...Bookmarks.errors, error]));
  }
};
