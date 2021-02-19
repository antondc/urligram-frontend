import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ReceiveUserItem, ReceiveUsersResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { receiveUsers } from './receiveUsers';
import { requestUsers } from './requestUsers';

export const userFollowersLoad = (userId: string): ThunkAction<any, any, any, Action> => async (dispatch: Dispatch) => {
  try {
    dispatch(requestUsers());

    const {
      meta: { totalItems },
      data,
    }: ReceiveUsersResponse = await HttpClient.get(`/users/${userId}/followers${window.location.search}`);

    const usersByKey = {
      byKey: serializerFromArrayToByKey<ReceiveUserItem, UserState>({
        data: data,
        contentPath: 'attributes',
      }),
      currentIds: data.map((item) => item.id),
      meta: {
        totalItems,
      },
    };
    dispatch(receiveUsers(usersByKey));
  } catch (err) {
    throw new Error(err);
  }

  return;
};
