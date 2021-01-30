import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { loadListsReceive } from 'Modules/Lists/actions/loadListsReceive';
import { ListState, ReceiveListItem, ReceiveListsResponse } from 'Modules/Lists/lists.types';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { sectionsFollowingListsReceive } from './sectionsFollowingListsReceive';
import { sectionsFollowingListsRequest } from './sectionsFollowingListsRequest';

export const sectionsFollowingListsLoad = (sessionId: string): ThunkAction<any, any, any, Action> => async (
  dispatch?: Dispatch
) => {
  dispatch(sectionsFollowingListsRequest());

  const { data }: ReceiveListsResponse = await HttpClient.get(
    `/users/${sessionId}/lists?page[size]=5&filter[role]=reader,editor`
  );

  const myListsByKey = {
    byKey: serializerFromArrayToByKey<ReceiveListItem, ListState>({
      data: data,
      contentPath: 'attributes',
    }),
  };

  dispatch(loadListsReceive(myListsByKey));

  dispatch(
    sectionsFollowingListsReceive({
      FollowingLists: {
        currentIds: data.map((item) => item.id),
      },
    })
  );

  return;
};
