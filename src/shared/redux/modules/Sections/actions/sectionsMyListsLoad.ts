import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { listsLoadReceive } from 'Modules/Lists/actions/listsLoadReceive';
import { ListApiResponseItem, ListsLoadApiResponse, ListState } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { sectionsMyListsReceive } from './sectionsMyListsReceive';
import { sectionsMyListsRequest } from './sectionsMyListsRequest';

export const sectionsMyListsLoad = (sessionId: string): ThunkAction<any, any, any, Action> => async (
  dispatch?: Dispatch
) => {
  if (!sessionId) return;

  try {
    dispatch(sectionsMyListsRequest());

    const { data }: ListsLoadApiResponse = await HttpClient.get(
      `/users/${sessionId}/lists?page[size]=5&filter[role]=admin`
    );

    const myListsByKey = {
      byKey: serializerFromArrayToByKey<ListApiResponseItem, ListState>({
        data: data,
        contentPath: 'attributes',
      }),
    };

    dispatch(listsLoadReceive(myListsByKey));

    dispatch(
      sectionsMyListsReceive({
        MyLists: {
          currentIds: data.map((item) => item.id),
        },
      })
    );
  } catch (err) {
    throw new Error(err);
  }

  return;
};
