import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { CreateListRequest, CreateListResponse } from 'Modules/Lists/lists.types';
import HttpClient from 'Services/HttpClient';
import { listCreateFailure } from './listCreateFailure';
import { listCreateRequest } from './listCreateRequest';
import { listCreateSuccess } from './listCreateSuccess';

export const listCreate = ({
  listName,
  listDescription,
  listIsPrivate,
}: CreateListRequest): ThunkAction<any, any, any, Action> => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(listCreateRequest());

    const { data: listData }: CreateListResponse = await HttpClient.post('/lists', {
      listName,
      listDescription,
      listIsPrivate,
    });
    await dispatch(listCreateSuccess({ list: listData?.attributes }));
  } catch (error) {
    await dispatch(listCreateFailure({ error }));

    throw new Error(error);
  }

  return;
};
