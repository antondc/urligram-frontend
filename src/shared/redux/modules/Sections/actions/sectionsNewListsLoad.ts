import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { loadListsReceive } from 'Modules/Lists/actions/loadListsReceive';
import { ListState, ReceiveListItem, ReceiveListsResponse } from 'Modules/Lists/lists.types';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { sectionsNewListsReceive } from './sectionsNewListsReceive';
import { sectionsNewListsRequest } from './sectionsNewListsRequest';

export const sectionsNewListsLoad = (): ThunkAction<any, any, any, Action> => async (dispatch?: Dispatch) => {
  try {
    dispatch(sectionsNewListsRequest());

    const { data }: ReceiveListsResponse = await HttpClient.get('/lists?sort=-createdAt&page[size]=5');

    const popularListsByKey = {
      byKey: serializerFromArrayToByKey<ReceiveListItem, ListState>({
        data: data,
        contentPath: 'attributes',
      }),
    };

    dispatch(loadListsReceive(popularListsByKey));

    dispatch(
      sectionsNewListsReceive({
        NewLists: {
          currentIds: data.map((item) => item.id),
        },
      })
    );
  } catch (err) {
    throw new Error(err);
  }

  return;
};
