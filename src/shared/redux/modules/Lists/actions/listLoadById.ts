import { ListLoadApiResponse, ListsActions, ListState } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { listsLoadReceive } from './listsLoadReceive';
import { listsLoadRequest } from './listsLoadRequest';

export const listLoadById = (listId: number): AppThunk<Promise<ListState>, ListsActions> => async (
  dispatch,
  getState
): Promise<ListState> => {
  const { Lists: listsBeforeRequest } = getState();
  try {
    dispatch(
      listsLoadRequest({
        ...listsBeforeRequest,
        loading: true,
        meta: {
          ...listsBeforeRequest.meta,
          sort: undefined,
        },
      })
    );

    const { data: listData } = await HttpClient.get<void, ListLoadApiResponse>(
      `/lists/${listId}${window.location.search}`
    );
    const { Lists: listsAfterResponse } = getState();

    dispatch(
      listsLoadReceive({
        ...listsAfterResponse,
        byKey: {
          ...listsAfterResponse.byKey,
          [listData?.id]: listData?.attributes,
        },
        currentIds: [listData?.id],
      })
    );

    return listData?.attributes;
  } catch (error) {
    throw error;
  }
};
