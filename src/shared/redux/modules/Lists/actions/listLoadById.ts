import { ListLoadApiResponse, ListsActions, ListState } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { listsLoadReceive } from './listsLoadReceive';
import { listsLoadRequest } from './listsLoadRequest';

export const listLoadById = (listId: number): AppThunk<Promise<ListState>, ListsActions> => async (
  dispatch,
  getState
): Promise<ListState> => {
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

    const { data: listData } = await HttpClient.get<void, ListLoadApiResponse>(
      `/lists/${listId}${window.location.search}`
    );

    dispatch(
      listsLoadReceive({
        ...Lists,
        byKey: {
          ...Lists.byKey,
          [listData?.id]: listData?.attributes,
        },
        currentIds: [listData?.id],
      })
    );

    return listData?.attributes;
  } catch (err) {
    throw new Error(err);
  }
};
