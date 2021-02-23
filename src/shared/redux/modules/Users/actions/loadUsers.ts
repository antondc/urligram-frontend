import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ReceiveUserItem, ReceiveUsersResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { receiveUsers } from './receiveUsers';
import { requestUsers } from './requestUsers';

export const loadUsers = (): ThunkAction<any, any, any, Action> => async (dispatch: Dispatch) => {
  const APIBaseEndpoint = '/users';
  try {
    dispatch(requestUsers());

    const {
      meta: { totalItems, sort },
      data,
    }: ReceiveUsersResponse = await HttpClient.get(APIBaseEndpoint + window.location.search);

    const usersByKey = {
      byKey: serializerFromArrayToByKey<ReceiveUserItem, UserState>({
        data: data,
        contentPath: 'attributes',
      }),
      currentIds: data.map((item) => item.id),
      meta: {
        totalItems,
        sort,
      },
    };
    dispatch(receiveUsers(usersByKey));
  } catch (err) {
    throw new Error(err);
  }

  return;
};
