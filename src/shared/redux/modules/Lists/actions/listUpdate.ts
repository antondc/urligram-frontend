import { ListsActions, ListState, ListUpdateApiRequest, ListUpdateApiResponse } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { listUpdateFailure } from './listUpdateFailure';
import { listUpdateRequest } from './listUpdateRequest';
import { listUpdateSuccess } from './listUpdateSuccess';

export const listUpdate = ({
  listId,
  listName,
  listDescription,
  listIsPrivate,
}: ListUpdateApiRequest): AppThunk<Promise<ListState>, ListsActions> => async (
  dispatch,
  getState
): Promise<ListState> => {
  try {
    const { Lists: listsBeforeRequest } = getState();
    dispatch(listUpdateRequest({ ...listsBeforeRequest }));

    const { data } = await HttpClient.put<void, ListUpdateApiResponse>(`/lists/${listId}`, {
      name: listName,
      description: listDescription,
      isPrivate: listIsPrivate,
    });
    const { Lists: listsAfterResponse } = getState();

    await dispatch(
      listUpdateSuccess({
        ...listsAfterResponse,
        byKey: {
          ...listsAfterResponse.byKey,
          [data.attributes.id]: data.attributes,
        },
      })
    );

    return data?.attributes;
  } catch (error) {
    const { Lists: listsOnError } = getState();

    await dispatch(
      listUpdateFailure({
        ...listsOnError,
        errors: [...listsOnError?.errors, error],
      })
    );

    throw new Error(error);
  }
};
