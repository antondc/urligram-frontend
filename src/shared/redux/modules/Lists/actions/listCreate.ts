import { ListCreateApiRequest, ListCreateApiResponse, ListsActions, ListState } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { listCreateFailure } from './listCreateFailure';
import { listCreateRequest } from './listCreateRequest';
import { listCreateSuccess } from './listCreateSuccess';

export const listCreate = ({
  listName,
  listDescription,
  listIsPrivate,
}: ListCreateApiRequest): AppThunk<Promise<ListState>, ListsActions> => async (
  dispatch,
  getState
): Promise<ListState> => {
  const { Lists: listsBeforeRequest } = getState();
  try {
    dispatch(listCreateRequest({ ...listsBeforeRequest }));

    const { data } = await HttpClient.post<void, ListCreateApiResponse>('/lists', {
      listName,
      listDescription,
      listIsPrivate,
    });
    const { Lists: listsAfterResponse } = getState();

    await dispatch(
      listCreateSuccess({
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
      listCreateFailure({
        ...listsOnError,
        errors: [...(listsOnError?.errors || []), error],
      })
    );

    throw error;
  }
};
