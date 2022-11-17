import { bookmarkUpdateFailure } from 'Modules/Bookmarks/actions/bookmarkUpdateFailure';
import { bookmarkUpdateSuccess } from 'Modules/Bookmarks/actions/bookmarkUpdateSuccess';
import { BookmarksActions, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { bookmarkUpdateRequest } from './bookmarkUpdateRequest';

interface BookmarkUpdateApiRequest {
  bookmarkId: number;
  order: number;
  title: string;
  isPublic: boolean;
  tags: {
    tag: string;
  }[];
  notes: string;
}

export interface BookmarkUpdateApiResponse {
  data: {
    attributes: BookmarkState;
  };
}

export const bookmarkUpdate =
  ({
    bookmarkId,
    order,
    title,
    isPublic,
    tags,
    notes,
  }: BookmarkUpdateApiRequest): AppThunk<Promise<BookmarkState>, BookmarksActions> =>
  async (dispatch, getState): Promise<BookmarkState> => {
    const { Bookmarks: bookmarksBeforeRequest } = getState();
    try {
      dispatch(bookmarkUpdateRequest(bookmarksBeforeRequest));

      const { data: bookmarkData } = await HttpClient.put<any, BookmarkUpdateApiResponse>(
        `/users/me/bookmarks/${bookmarkId}`,
        {
          order,
          title,
          isPublic,
          tags,
          notes,
        }
      );
      const { Bookmarks: bookmarksAfterResponse } = getState();

      const aaa = {
        ...bookmarksAfterResponse,
        byKey: {
          ...bookmarksAfterResponse.byKey,
          [bookmarkData.attributes.id]: bookmarkData.attributes,
        },
      };
      await dispatch(bookmarkUpdateSuccess(aaa));

      return bookmarkData?.attributes;
    } catch (error) {
      const { Bookmarks: bookmarksOnError } = getState();

      await dispatch(
        bookmarkUpdateFailure({
          ...bookmarksOnError,
          errors: [...(bookmarksOnError.errors || []), error],
        })
      );

      throw error;
    }
  };
