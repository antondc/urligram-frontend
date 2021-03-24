import { Dispatch } from 'redux';

import { ListCreateApiRequest, ListCreateApiResponse, ListsActions, ListState } from 'Modules/Lists/lists.types';
import { RootState } from 'Modules/rootType';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { listCreateFailure } from './listCreateFailure';
import { listCreateRequest } from './listCreateRequest';
import { listCreateSuccess } from './listCreateSuccess';

export const listCreate = ({
  listName,
  listDescription,
  listIsPrivate,
}: ListCreateApiRequest): AppThunk<Promise<ListState>> => async (
  dispatch: Dispatch<ListsActions>,
  getState: () => RootState
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
