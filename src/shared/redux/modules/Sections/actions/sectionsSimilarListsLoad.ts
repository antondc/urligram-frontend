import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { listsLoadReceive } from 'Modules/Lists/actions/listsLoadReceive';
import { ListApiResponseItem, ListsLoadApiResponse, ListState } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { sectionsSimilarListsReceive } from './sectionsSimilarListsReceive';
import { sectionsSimilarListsRequest } from './sectionsSimilarListsRequest';

export const sectionsSimilarListsLoad = (listId: number): ThunkAction<any, any, any, Action> => async (
  dispatch?: Dispatch
) => {
  try {
    dispatch(sectionsSimilarListsRequest());

    const { data }: ListsLoadApiResponse = await HttpClient.get(`/lists/${listId}/similar?page[size]=5`);

    const myListsByKey = {
      byKey: serializerFromArrayToByKey<ListApiResponseItem, ListState>({
        data: data,
        contentPath: 'attributes',
      }),
    };

    dispatch(listsLoadReceive(myListsByKey));

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
