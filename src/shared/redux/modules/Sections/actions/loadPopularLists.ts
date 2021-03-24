import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { listsLoadReceive } from 'Modules/Lists/actions/listsLoadReceive';
import { ListApiResponseItem, ListsLoadApiResponse, ListState } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { receivePopularLists } from './receivePopularLists';
import { requestPopularLists } from './requestPopularLists';

export const loadPopularLists = (): ThunkAction<any, any, any, Action> => async (dispatch?: Dispatch) => {
  dispatch(requestPopularLists());
  try {
    const { data }: ListsLoadApiResponse = await HttpClient.get('/lists?sort=-members&page[size]=5');

    const popularListsByKey = {
      byKey: serializerFromArrayToByKey<ListApiResponseItem, ListState>({
        data,
        contentPath: 'attributes',
      }),
    };

    dispatch(listsLoadReceive(popularListsByKey));

    dispatch(
      receivePopularLists({
        PopularLists: {
          currentIds: data.map((item) => item.id),
        },
      })
    );
  } catch (err) {
    throw new Error(err);
  }

  return;
};
