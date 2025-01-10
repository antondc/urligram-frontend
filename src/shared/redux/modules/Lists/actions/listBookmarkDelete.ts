import { bookmarkLoadByIds } from 'Modules/Bookmarks/actions/bookmarksLoadByIds';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import {
  LIST_BOOKMARK_DELETE_FAILURE,
  LIST_BOOKMARK_DELETE_REQUEST,
  LIST_BOOKMARK_DELETE_SUCCESS,
  ListBookmarkCreateApiRequest,
  ListBookmarkCreateApiResponse,
  ListsActions,
} from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { listLoadById } from './listLoadById';

export const listBookmarkDelete =
  ({ bookmarkId, listId }: ListBookmarkCreateApiRequest): AppThunk<Promise<BookmarkState>, ListsActions> =>
  async (dispatch, getState): Promise<BookmarkState> => {
    const { Lists: listsBeforeRequest } = getState();
    try {
      dispatch({
        type: LIST_BOOKMARK_DELETE_REQUEST,
        payload: listsBeforeRequest,
      });

      const { data } = await HttpClient.delete<void, ListBookmarkCreateApiResponse>(
        `/lists/${listId}/bookmarks/${bookmarkId}`
      );
      const { Lists: listsAfterResponse, Bookmarks: bookmarksAfterResponse } = getState();

      const filteredBookmarks = listsAfterResponse?.byKey[listId]?.bookmarksIds?.filter((item) => item !== bookmarkId);
      const filteredBookmarkIds = bookmarksAfterResponse?.currentIds?.filter((item) => item !== bookmarkId);

      await dispatch({
        type: LIST_BOOKMARK_DELETE_SUCCESS,
        payload: {
          ...listsAfterResponse,
          byKey: {
            ...listsAfterResponse?.byKey,
            [listId]: {
              ...listsAfterResponse?.byKey[listId],
              bookmarksIds: filteredBookmarks,
            },
          },
        },
      });
      await dispatch(listLoadById(listId));
      await dispatch(bookmarkLoadByIds({ bookmarksIds: filteredBookmarkIds }));

      return data?.attributes;
    } catch (error) {
      const { Lists: listsOnError } = getState();

      await dispatch({
        type: LIST_BOOKMARK_DELETE_FAILURE,
        payload: {
          ...listsOnError,
          errors: [...(listsOnError?.errors || []), error],
        },
      });

      throw error;
    }
  };
