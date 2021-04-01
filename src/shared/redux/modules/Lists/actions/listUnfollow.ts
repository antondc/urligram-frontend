import {
  LIST_UNFOLLOW_FAILURE,
  LIST_UNFOLLOW_REQUEST,
  LIST_UNFOLLOW_SUCCESS,
  ListFollowApiRequest,
  ListFollowApiResponse,
  ListsActions,
  ListUser,
} from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';

export const listUnfollow = ({
  listId,
  userId,
}: ListFollowApiRequest): AppThunk<Promise<ListUser>, ListsActions> => async (
  dispatch,
  getState
): Promise<ListUser> => {
  try {
    const { Lists: listsBeforeRequest } = getState();
    dispatch({
      type: LIST_UNFOLLOW_REQUEST,
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

    const { data } = await HttpClient.delete<void, ListFollowApiResponse>(`/lists/${listId}/users/${userId}`);
    const { Lists: listsAfterResponse } = getState();

    const listMembersWithoutUser =
      listsAfterResponse.byKey[listId]?.members?.filter((item) => item.id !== userId) || [];

    const payload = {
      ...listsAfterResponse,
      byKey: {
        ...listsAfterResponse.byKey,
        [listId]: {
          ...listsAfterResponse.byKey[listId],
          members: listMembersWithoutUser,
          loading: false,
        },
      },
    };

    await dispatch({
      type: LIST_UNFOLLOW_SUCCESS,
      payload,
    });

    return data?.attributes;
  } catch (error) {
    const { Lists: listsOnError } = getState();

    await dispatch({
      type: LIST_UNFOLLOW_FAILURE,
      payload: {
        ...listsOnError,
        payload: {
          ...listsOnError,
          byKey: {
            ...listsOnError.byKey,
            [listId]: {
              ...listsOnError.byKey[listId],
              loading: false,
            },
          },
        },
        errors: [...listsOnError?.errors, error],
      },
    });

    throw new Error(error);
  }
};
