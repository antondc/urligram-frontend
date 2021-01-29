import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { loadListsReceive } from 'Modules/Lists/actions/loadListsReceive';
import { ListState, ReceiveListItem, ReceiveListsResponse } from 'Modules/Lists/lists.types';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { sectionsMyListsReceive } from './sectionsMyListsReceive';
import { sectionsMyListsRequest } from './sectionsMyListsRequest';

export const sectionsMyListsLoad = (sessionId: string): ThunkAction<any, any, any, Action> => async (
  dispatch?: Dispatch
) => {
  dispatch(sectionsMyListsRequest());

  const { data }: ReceiveListsResponse = await HttpClient.get(`/users/${sessionId}/lists?page[size]=5&filter[role]=admin`);

  const myListsByKey = {
    byKey: serializerFromArrayToByKey<ReceiveListItem, ListState>({
      data: data,
      contentPath: 'attributes',
    }),
  };

  dispatch(loadListsReceive(myListsByKey));

  dispatch(
    sectionsMyListsReceive({
      MyLists: {
        currentIds: data.map((item) => item.id),
      },
    })
  );

  return;
};
