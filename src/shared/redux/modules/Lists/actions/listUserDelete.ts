import {
  LIST_USER_DELETE_FAILURE,
  LIST_USER_DELETE_REQUEST,
  LIST_USER_DELETE_SUCCESS,
  ListsActions,
} from 'Modules/Lists/lists.types';
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
      userRole: 'reader' | 'editor';
    };
  };
}

export const listUserDelete = ({ listId, userId }: ListUserDelete): AppThunk<Promise<void>, ListsActions> => async (
  dispatch,
  getState
): Promise<void> => {
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

    const { Lists: listsAfterResponse } = getState();

    const membersModified = listsAfterResponse?.byKey[listId]?.members?.filter((item) => item.id !== userId);

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
