import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ReceiveListResponse } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { loadListsReceive } from './loadListsReceive';
import { loadListsRequest } from './loadListsRequest';

export const loadListById = (listId: number): ThunkAction<any, any, any, Action> => async (dispatch: Dispatch) => {
  dispatch(loadListsRequest());

  const { data: listData }: ReceiveListResponse = await HttpClient.get(`/lists/${listId}${window.location.search}`);

  const listsByKey = {
    byKey: {
      [listData?.id]: listData?.attributes,
    },
    currentIds: [listData?.id],
  };
  dispatch(loadListsReceive(listsByKey));

  return;
};
