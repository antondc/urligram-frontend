import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ListApiResponseItem, ListsLoadApiResponse, ListState } from 'Modules/Lists/lists.types';
import { listsLoadReceive } from 'Root/src/shared/redux/modules/Lists/actions/listsLoadReceive';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { sectionsNewListsReceive } from './sectionsNewListsReceive';
import { sectionsNewListsRequest } from './sectionsNewListsRequest';

export const sectionsNewListsLoad = (): ThunkAction<any, any, any, Action> => async (dispatch?: Dispatch) => {
  try {
    dispatch(sectionsNewListsRequest());

    const { data }: ListsLoadApiResponse = await HttpClient.get('/lists?sort=-createdat&page[size]=5');

    const popularListsByKey = {
      byKey: serializerFromArrayToByKey<ListApiResponseItem, ListState>({
        data: data,
        contentPath: 'attributes',
      }),
    };

    dispatch(listsLoadReceive(popularListsByKey));

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
