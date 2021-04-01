import {
  LIST_FOLLOW_FAILURE,
  LIST_FOLLOW_REQUEST,
  LIST_FOLLOW_SUCCESS,
  ListFollowApiRequest,
  ListFollowApiResponse,
  ListsActions,
  ListUser,
} from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';

export const listFollow = ({
  listId,
  userId,
}: ListFollowApiRequest): AppThunk<Promise<ListUser>, ListsActions> => async (
  dispatch,
  getState
): Promise<ListUser> => {
  try {
    const { Lists: listsBeforeRequest } = getState();
    dispatch({
      type: LIST_FOLLOW_REQUEST,
      payload: listsBeforeRequest,
    });

    const { data } = await HttpClient.post<void, ListFollowApiResponse>(`/lists/${listId}/users/${userId}`);
    const { Lists: listsAfterResponse } = getState();

    const payload = {
      ...listsAfterResponse,
      byKey: {
        ...listsAfterResponse.byKey,
        [listId]: {
          ...listsAfterResponse.byKey[listId],
          members: [
            ...(listsAfterResponse.byKey[listId]?.members || []), // TODO: Firefox will fail on undefined
            {
              id: data?.attributes?.id,
              userRole: data?.attributes?.userRole,
            },
          ],
        },
      },
    };

    await dispatch({
      type: LIST_FOLLOW_SUCCESS,
      payload,
    });

    return data?.attributes;
  } catch (error) {
    const { Lists: listsOnError } = getState();

    await dispatch({
      type: LIST_FOLLOW_FAILURE,
      payload: {
        ...listsOnError,
        errors: [...listsOnError?.errors, error],
      },
    });

    throw new Error(error);
  }
};
