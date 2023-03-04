import {
  LIST_USER_DELETE_FAILURE,
  LIST_USER_DELETE_REQUEST,
  LIST_USER_DELETE_SUCCESS,
  ListsActions,
  ListUserRole,
} from 'Modules/Lists/lists.types';
import { usersReceive } from 'Modules/Users/actions/usersReceive';
import { UsersActions } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';

interface ListUserDelete {
  listId: number;
  userId: string;
}

interface ListUserDeleteResponse {
  data: {
    attributes: {
      id: string;
      userListStatus: boolean;
      userRole: ListUserRole;
    };
  };
}

export const listUserDelete =
  ({ listId, userId }: ListUserDelete): AppThunk<Promise<void>, ListsActions | UsersActions> =>
  async (dispatch, getState): Promise<void> => {
    try {
      const { Lists: listsBeforeRequest } = getState();
      dispatch({
        type: LIST_USER_DELETE_REQUEST,
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

      await HttpClient.delete<void, ListUserDeleteResponse>(`/lists/${listId}/users/${userId}`);

      const { Lists: listsAfterResponse, Users: usersAfterResponse } = getState();

      const membersModified = listsAfterResponse?.byKey[listId]?.members?.filter((item) => item.id !== userId);

      // Remove user from list
      await dispatch({
        type: LIST_USER_DELETE_SUCCESS,
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

      // Remove list from user
      dispatch(
        usersReceive({
          ...usersAfterResponse,
          byKey: {
            ...usersAfterResponse.byKey,
            [userId]: {
              ...usersAfterResponse.byKey[userId],
              lists: usersAfterResponse.byKey[userId].lists.filter((item) => item.id !== listId),
            },
          },
        })
      );

      return;
    } catch (error) {
      const { Lists: listsOnError } = getState();

      await dispatch({
        type: LIST_USER_DELETE_FAILURE,
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
