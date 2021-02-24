import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ListState, ReceiveListItem, ReceiveListsResponse } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { loadListsReceive } from './loadListsReceive';
import { loadListsRequest } from './loadListsRequest';

export const loadLists = (): ThunkAction<any, any, any, Action> => async (dispatch: Dispatch) => {
  try {
    dispatch(loadListsRequest());

    const {
      meta: { totalItems, sort },
      data,
    }: ReceiveListsResponse = await HttpClient.get('/lists' + window.location.search);

    const listsByKey = {
      byKey: serializerFromArrayToByKey<ReceiveListItem, ListState>({
        data: data,
        contentPath: 'attributes',
      }),
      currentIds: data.map((item) => item.id),
      meta: {
        totalItems,
        sort,
      },
    };
    dispatch(loadListsReceive(listsByKey));
  } catch (err) {
    throw new Error(err);
  }

  return;
};
