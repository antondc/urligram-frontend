import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { loadListsReceive } from 'Modules/Lists/actions/loadListsReceive';
import { ListState, ReceiveListItem, ReceiveListsResponse } from 'Modules/Lists/lists.types';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { sectionsSimilarListsReceive } from './sectionsSimilarListsReceive';
import { sectionsSimilarListsRequest } from './sectionsSimilarListsRequest';

export const sectionsSimilarListsLoad = (listId: number): ThunkAction<any, any, any, Action> => async (
  dispatch?: Dispatch
) => {
  try {
    dispatch(sectionsSimilarListsRequest());

    const { data }: ReceiveListsResponse = await HttpClient.get(`/lists/${listId}/similar?page[size]=5`);

    const myListsByKey = {
      byKey: serializerFromArrayToByKey<ReceiveListItem, ListState>({
        data: data,
        contentPath: 'attributes',
      }),
    };

    dispatch(loadListsReceive(myListsByKey));

    dispatch(
      sectionsSimilarListsReceive({
        SimilarLists: {
          currentIds: data.map((item) => item.id),
        },
      })
    );
  } catch (err) {
    throw new Error(err);
  }

  return;
};
