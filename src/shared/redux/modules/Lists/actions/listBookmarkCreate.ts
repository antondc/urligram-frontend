import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import {
  LIST_BOOKMARK_CREATE_FAILURE,
  LIST_BOOKMARK_CREATE_REQUEST,
  LIST_BOOKMARK_CREATE_SUCCESS,
  ListBookmarkCreateApiRequest,
  ListBookmarkCreateApiResponse,
  ListsActions,
} from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { listLoadById } from './listLoadById';

export const listBookmarkCreate =
  ({ bookmarkId, listId }: ListBookmarkCreateApiRequest): AppThunk<Promise<BookmarkState>, ListsActions> =>
  async (dispatch, getState): Promise<BookmarkState> => {
    const { Lists: listsBeforeRequest } = getState();
    try {
      dispatch({
        type: LIST_BOOKMARK_CREATE_REQUEST,
        payload: listsBeforeRequest,
      });

      const { data } = await HttpClient.post<void, ListBookmarkCreateApiResponse>(
        `/lists/${listId}/bookmarks/${bookmarkId}`
      );
      const { Lists: listsAfterResponse } = getState();

      await dispatch({
        type: LIST_BOOKMARK_CREATE_SUCCESS,
        payload: {
          ...listsAfterResponse,
          byKey: {
            ...listsAfterResponse.byKey,
            [listId]: {
              ...listsAfterResponse.byKey[listId],
              bookmarksIds: [...(listsAfterResponse?.byKey[listId]?.bookmarksIds || []), bookmarkId],
            },
          },
        },
      });
      await dispatch(listLoadById(listId));

      return data?.attributes;
    } catch (error) {
      const { Lists: listsOnError } = getState();

      await dispatch({
        type: LIST_BOOKMARK_CREATE_FAILURE,
        payload: {
          ...listsOnError,
          errors: [...(listsOnError?.errors || []), error],
        },
      });

      return;
    }
  };
