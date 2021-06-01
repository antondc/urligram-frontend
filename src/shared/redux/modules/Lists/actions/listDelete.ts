import {
  LIST_DELETE_FAILURE,
  LIST_DELETE_REQUEST,
  LIST_DELETE_SUCCESS,
  ListDeleteApiRequest,
  ListDeleteApiResponse,
  ListsActions,
  ListState,
} from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';

export const listDelete = ({ listId }: ListDeleteApiRequest): AppThunk<Promise<ListState>, ListsActions> => async (
  dispatch,
  getState
): Promise<ListState> => {
  const { Lists: listsBeforeRequest } = getState();
  try {
    dispatch({
      type: LIST_DELETE_REQUEST,
      payload: listsBeforeRequest,
    });

    const { data } = await HttpClient.delete<void, ListDeleteApiResponse>(`/lists/${listId}`);

    const { Lists: listsAfterResponse } = getState();

    await dispatch({
      type: LIST_DELETE_SUCCESS,
      payload: {
        ...listsAfterResponse,
        byKey: {
          ...listsAfterResponse?.byKey,
          [listId]: undefined,
        },
        currentIds: listsAfterResponse?.currentIds?.filter((item) => item !== listId),
      },
    });

    return data?.attributes;
  } catch (error) {
    const { Lists: listsOnError } = getState();

    await dispatch({
      type: LIST_DELETE_FAILURE,
      payload: {
        ...listsOnError,
        errors: [...(listsOnError?.errors || []), error],
      },
    });

    throw error;
  }
};
