import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ListState, ReceiveListItem, ReceiveListsResponse } from 'Modules/Lists/lists.types';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { loadListsReceive } from './loadListsReceive';
import { loadListsRequest } from './loadListsRequest';

export const listsLoadByUserId = (userId: string): ThunkAction<any, any, any, Action> => async (dispatch: Dispatch) => {
  if (!userId) return;
  try {
    dispatch(loadListsRequest());

    const {
      meta: { totalItems, sort },
      data: listsData,
    }: ReceiveListsResponse = await HttpClient.get(`/users/${userId}/lists${window.location.search}`);

    const listsByKey = {
      byKey: serializerFromArrayToByKey<ReceiveListItem, ListState>({
        data: listsData,
        contentPath: 'attributes',
      }),
      currentIds: listsData.map((item) => item.id),
      meta: {
        totalItems,
        sort,
      },
    };

    dispatch(loadListsReceive(listsByKey));
  } catch (err) {
    throw new Error(err);
  }

  return;
};
