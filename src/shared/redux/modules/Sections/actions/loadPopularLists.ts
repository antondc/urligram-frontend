import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ListState, ReceiveListItem, ReceiveListsResponse } from 'Modules/Lists/lists.types';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { loadListsReceive } from '../../Lists/actions/loadListsReceive';
import { receivePopularLists } from './receivePopularLists';
import { requestPopularLists } from './requestPopularLists';

export const loadPopularLists = (): ThunkAction<any, any, any, Action> => async (dispatch?: Dispatch) => {
  dispatch(requestPopularLists());
  try {
    const { data }: ReceiveListsResponse = await HttpClient.get('/lists?sort=-members&page[size]=5');

    const popularListsByKey = {
      byKey: serializerFromArrayToByKey<ReceiveListItem, ListState>({
        data,
        contentPath: 'attributes',
      }),
    };

    dispatch(loadListsReceive(popularListsByKey));

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
