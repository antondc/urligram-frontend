import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { receiveUsers } from 'Modules/Users/actions/receiveUsers';
import { ReceiveUserItem, ReceiveUsersResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { sectionsFollowersUsersReceive } from './sectionsFollowersUsersReceive';
import { sectionsFollowersUsersRequest } from './sectionsFollowersUsersRequest';

export const sectionsFollowersUsersLoad = (userId: string): ThunkAction<any, any, any, Action> => async (
  dispatch?: Dispatch
) => {
  if (!userId) return;

  try {
    dispatch(sectionsFollowersUsersRequest());

    const { data }: ReceiveUsersResponse = await HttpClient.get(
      `/users/${userId}/followers?sort=-createdat&page[size]=5`
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
