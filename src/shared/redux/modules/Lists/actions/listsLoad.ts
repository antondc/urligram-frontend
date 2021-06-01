import { ListsActions, ListsLoadApiResponse, ListState } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { listsLoadReceive } from './listsLoadReceive';
import { listsLoadRequest } from './listsLoadRequest';

export const listsLoad = (): AppThunk<Promise<ListState[]>, ListsActions> => async (
  dispatch,
  getState
): Promise<ListState[]> => {
  const { Lists } = getState();
  try {
    dispatch(
      listsLoadRequest({
        ...Lists,
        loading: true,
        meta: {
          ...Lists.meta,
          sort: undefined,
        },
      })
    );

    const {
      meta: { totalItems, sort },
      data,
    } = await HttpClient.get<void, ListsLoadApiResponse>('/lists' + window.location.search);

    const listsArray = data?.map((item) => item.attributes);

    dispatch(
      listsLoadReceive({
        byKey: serializerFromArrayToByKey<ListState, ListState>({
          data: listsArray,
        }),
        currentIds: data?.map((item) => item.id),
        meta: {
          totalItems,
          sort,
        },
        loading: false,
      })
    );

    return listsArray;
  } catch (error) {
    throw error;
  }
};
