import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ReceiveUserItem, ReceiveUsersResponse, UserState } from 'Modules/Users/users.types';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { receiveUsers } from '../../Users/actions/receiveUsers';
import { sectionsFollowingUsersReceive } from './sectionsFollowingUsersReceive';
import { sectionsFollowingUsersRequest } from './sectionsFollowingUsersRequest';

export const sectionsFollowingUsersLoad = (sessionId: string): ThunkAction<any, any, any, Action> => async (
  dispatch?: Dispatch
) => {
  dispatch(sectionsFollowingUsersRequest());
  const { data }: ReceiveUsersResponse = await HttpClient.get(
    `/users/${sessionId}/following?sort=-createdAt&page[size]=5`
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

  return;
};
