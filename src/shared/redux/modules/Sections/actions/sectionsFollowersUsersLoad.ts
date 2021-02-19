import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ReceiveUserItem, ReceiveUsersResponse, UserState } from 'Modules/Users/users.types';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { receiveUsers } from '../../Users/actions/receiveUsers';
import { sectionsFollowersUsersReceive } from './sectionsFollowersUsersReceive';
import { sectionsFollowersUsersRequest } from './sectionsFollowersUsersRequest';

export const sectionsFollowersUsersLoad = (userId: string): ThunkAction<any, any, any, Action> => async (
  dispatch?: Dispatch
) => {
  if (!userId) return;

  try {
    dispatch(sectionsFollowersUsersRequest());

    const { data }: ReceiveUsersResponse = await HttpClient.get(
      `/users/${userId}/followers?sort=-createdAt&page[size]=5`
    );

    const newUsersByKey = {
      byKey: serializerFromArrayToByKey<ReceiveUserItem, UserState>({
        data: data,
        contentPath: 'attributes',
      }),
    };

    dispatch(receiveUsers(newUsersByKey));

    dispatch(
      sectionsFollowersUsersReceive({
        FollowersUsers: {
          currentIds: data.map((item) => item.id),
        },
      })
    );
  } catch (err) {
    throw new Error(err);
  }

  return;
};
