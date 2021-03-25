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
  const { Lists } = getState();
  try {
    dispatch(listCreateRequest({ ...Lists }));

    const { data } = await HttpClient.post<void, ListCreateApiResponse>('/lists', {
      listName,
      listDescription,
      listIsPrivate,
    });

    await dispatch(
      listCreateSuccess({
        ...Lists,
        byKey: {
          ...Lists.byKey,
          [data.attributes.id]: data.attributes,
        },
      })
    );

    return data?.attributes;
  } catch (error) {
    await dispatch(
      listCreateFailure({
        ...Lists,
        errors: [...Lists?.errors, error],
      })
    );

    throw new Error(error);
  }
};
