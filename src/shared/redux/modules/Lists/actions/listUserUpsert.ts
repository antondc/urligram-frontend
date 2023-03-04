import {
  LIST_USER_UPSERT_FAILURE,
  LIST_USER_UPSERT_REQUEST,
  LIST_USER_UPSERT_SUCCESS,
  ListsActions,
  ListUserRole,
} from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';

interface ListUserUpsert {
  listId: number;
  userId: string;
  userRole: ListUserRole;
}

interface ListUserUpsertResponse {
  data: {
    attributes: {
      id: string;
      userListStatus: boolean;
      userRole: ListUserRole;
    };
  };
}

export const listUserUpsert =
  ({ listId, userId, userRole }: ListUserUpsert): AppThunk<Promise<void>, ListsActions> =>
  async (dispatch, getState): Promise<void> => {
    try {
      const { Lists: listsBeforeRequest } = getState();
      dispatch({
        type: LIST_USER_UPSERT_REQUEST,
        payload: {
          ...listsBeforeRequest,
          byKey: {
            ...listsBeforeRequest.byKey,
            [listId]: {
              ...listsBeforeRequest.byKey[listId],
              loading: true,
            },
          },
        },
      });

      const { data } = await HttpClient.put<void, ListUserUpsertResponse>(`/lists/${listId}/users/${userId}`, {
        userRole,
      });

      const { Lists: listsAfterResponse } = getState();

      const membersModified = [
        ...(listsAfterResponse?.byKey[listId]?.members?.filter((item) => item.id !== userId) || []),
        {
          id: data?.attributes?.id,
          userRole: data?.attributes?.userRole,
          userListStatus: data?.attributes?.userListStatus,
        },
      ];

      await dispatch({
        type: LIST_USER_UPSERT_SUCCESS,
        payload: {
          ...listsAfterResponse,
          byKey: {
            ...listsAfterResponse.byKey,
            [listId]: {
              ...listsAfterResponse.byKey[listId],
              members: membersModified,
              loading: false,
            },
          },
        },
      });

      return;
    } catch (error) {
      const { Lists: listsOnError } = getState();

      await dispatch({
        type: LIST_USER_UPSERT_FAILURE,
        payload: {
          ...listsOnError,
          byKey: {
            ...listsOnError.byKey,
            [listId]: {
              ...listsOnError.byKey[listId],
              loading: false,
            },
          },
          errors: [...(listsOnError?.errors || []), error],
        },
      });

      throw error;
    }
  };
