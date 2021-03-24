import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { receiveUsers } from 'Modules/Users/actions/receiveUsers';
import { ReceiveUserItem, ReceiveUsersResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { sectionsFollowingUsersReceive } from './sectionsFollowingUsersReceive';
import { sectionsFollowingUsersRequest } from './sectionsFollowingUsersRequest';

export const sectionsFollowingUsersLoad = (sessionId: string): ThunkAction<any, any, any, Action> => async (
  dispatch?: Dispatch
) => {
  try {
    dispatch(sectionsFollowingUsersRequest());

    const { data }: ReceiveUsersResponse = await HttpClient.get(
      `/users/${sessionId}/following?sort=-createdat&page[size]=5`
    );

    const newUsersByKey = {
      byKey: serializerFromArrayToByKey<ReceiveUserItem, UserState>({
        data: data,
        contentPath: 'attributes',
      }),
    };

    dispatch(receiveUsers(newUsersByKey));

    dispatch(
      sectionsFollowingUsersReceive({
        FollowingUsers: {
          currentIds: data.map((item) => item.id),
        },
      })
    );
  } catch (err) {
    throw new Error(err);
  }

  return;
};
