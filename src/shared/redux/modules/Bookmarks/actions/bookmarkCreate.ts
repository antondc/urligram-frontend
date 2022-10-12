import {
  BOOKMARK_CREATE_FAILURE,
  BOOKMARK_CREATE_REQUEST,
  BOOKMARK_CREATE_SUCCESS,
  BookmarksActions,
  BookmarkState,
} from 'Modules/Bookmarks/bookmarks.types';
import { USERS_LOAD_SUCCEED, UsersActions } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../../index';
import { LISTS_LOAD_SUCCESS, ListsActions } from '../../Lists/lists.types';

export interface BookmarkCreateApiRequest {
  bookmarkId?: number;
  title?: string;
  url?: string;
  isPrivate?: boolean;
  tags?: {
    tag: string;
  }[];
  notes: string;
}

export interface BookmarkCreateApiResponse {
  data: {
    attributes: BookmarkState;
  };
}

export const bookmarkCreate =
  ({
    title,
    url,
    isPrivate,
    tags,
    notes,
  }: BookmarkCreateApiRequest): AppThunk<Promise<BookmarkState>, BookmarksActions | UsersActions | ListsActions> =>
  async (dispatch, getState) => {
    const { Bookmarks: bookmarksBeforeRequest } = getState();

    try {
      dispatch({
        type: BOOKMARK_CREATE_REQUEST,
        payload: bookmarksBeforeRequest,
      });

      const { data: bookmarkData } = await HttpClient.post<void, BookmarkCreateApiResponse>('/users/me/bookmarks', {
        title,
        url,
        isPrivate,
        tags,
        notes,
      });

      const { Bookmarks: bookmarksAfterResponse, Users: usersAfterResponse, Lists: listsAfterResponse } = getState();

      // Update all bookmarks that refer to the same linkId as the created one
      const bookmarksToUpdate = Object.values(bookmarksAfterResponse?.byKey).filter(
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
        users: [...item?.users, bookmarkData?.attributes?.userId],
      }));

      // If any of the currentIds has same linkId as the newly created bookmark, then replace it for the new bookmark id
      const currentIdsWithNewItemReplaced = bookmarksAfterResponse?.currentIds?.map((item) => {
        if (bookmarksToUpdate.map((item) => item?.id).includes(item)) return bookmarkData?.attributes?.id;

        return item;
      });

      dispatch({
        type: BOOKMARK_CREATE_SUCCESS,
        payload: {
          ...bookmarksAfterResponse,
          byKey: {
            ...bookmarksAfterResponse?.byKey,
            ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksWithNewBookmark }),
            [bookmarkData?.attributes?.id]: bookmarkData?.attributes,
          },
          currentIds: currentIdsWithNewItemReplaced,
        },
      });

      dispatch({
        type: LISTS_LOAD_SUCCESS,
        payload: {
          ...listsAfterResponse,
          byKey: {
            ...listsAfterResponse.byKey,
          },
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

      dispatch({
        type: BOOKMARK_CREATE_FAILURE,
        payload: {
          ...bookmarksOnError,
          errors: [...(bookmarksOnError.errors || []), error],
        },
      });

      throw error;
    }
  };
