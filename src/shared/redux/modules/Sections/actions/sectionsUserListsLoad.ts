import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { loadListsReceive } from 'Modules/Lists/actions/loadListsReceive';
import { ListState, ReceiveListItem, ReceiveListsResponse } from 'Modules/Lists/lists.types';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { sectionsUserListsReceive } from './sectionsUserListsReceive';
import { sectionsUserListsRequest } from './sectionsUserListsRequest';

export const sectionsUserListsLoad = (sessionId: string): ThunkAction<any, any, any, Action> => async (
  dispatch?: Dispatch
) => {
  dispatch(sectionsUserListsRequest());

  const { data }: ReceiveListsResponse = await HttpClient.get(
    `/users/${sessionId}/lists?page[size]=5&filter[role]=admin`
  );

  const userListsByKey = {
    byKey: serializerFromArrayToByKey<ReceiveListItem, ListState>({
      data: data,
      contentPath: 'attributes',
    }),
  };

  dispatch(loadListsReceive(userListsByKey));

  dispatch(
    sectionsUserListsReceive({
      UserLists: {
        currentIds: data.map((item) => item.id),
      },
    })
  );

  return;
};
