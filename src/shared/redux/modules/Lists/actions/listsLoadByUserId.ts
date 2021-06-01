import { ListsActions, ListsLoadApiResponse, ListState } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { listsLoadReceive } from './listsLoadReceive';
import { listsLoadRequest } from './listsLoadRequest';

export const listsLoadByUserId = (userId: string): AppThunk<Promise<ListState>, ListsActions> => async (
  dispatch,
  getState
): Promise<ListState> => {
  if (!userId) return;

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

    const {
      meta: { totalItems, sort },
      data,
    } = await HttpClient.get<void, ListsLoadApiResponse>(`/users/${userId}/lists${window.location.search}`);
    const { Lists: listsAfterResponse } = getState();

    const listsArray = data?.map((item) => item.attributes);

    dispatch(
      listsLoadReceive({
        ...listsAfterResponse,
        byKey: {
          ...listsAfterResponse.byKey,
          ...serializerFromArrayToByKey<ListState, ListState>({ data: listsArray }),
        },
        currentIds: data?.map((item) => item.id),
        meta: {
          totalItems,
          sort,
        },
        loading: false,
      })
    );
  } catch (error) {
    throw error;
  }

  return;
};
