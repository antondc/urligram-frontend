import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ListState, ReceiveListItem, ReceiveListsResponse } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { loadListsReceive } from './loadListsReceive';
import { loadListsRequest } from './loadListsRequest';

export const loadLists = (): ThunkAction<any, any, any, Action> => async (dispatch: Dispatch) => {
  dispatch(loadListsRequest());

  const { data }: ReceiveListsResponse = await HttpClient.get('/lists' + window.location.search);

  const listsByKey = {
    byKey: serializerFromArrayToByKey<ReceiveListItem, ListState>({
      data: data,
      contentPath: 'attributes',
    }),
    currentIds: data.map((item) => item.id),
  };
  dispatch(loadListsReceive(listsByKey));

  return;
};
