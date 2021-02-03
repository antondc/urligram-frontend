import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { receiveUsers } from 'Modules/Users/actions/receiveUsers';
import { ReceiveUserItem, ReceiveUsersResponse, UserState } from 'Modules/Users/users.types';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { sectionsUsersInThisListReceive } from './sectionsUsersInThisListReceive';
import { sectionsUsersInThisListRequest } from './sectionsUsersInThisListRequest';

export const sectionsUsersInThisListLoad = (userIds: string[]): ThunkAction<any, any, any, Action> => async (
  dispatch?: Dispatch
) => {
  dispatch(sectionsUsersInThisListRequest());

  const { data }: ReceiveUsersResponse = await HttpClient.get('/users/ids', {
    params: {
      userIds,
    },
  });

  const usersByKey = {
    byKey: serializerFromArrayToByKey<ReceiveUserItem, UserState>({
      data: data,
      contentPath: 'attributes',
    }),
  };

  dispatch(receiveUsers(usersByKey));
  dispatch(
    sectionsUsersInThisListReceive({
      UsersInThisList: {
        currentIds: data.map((item) => item.id),
      },
    })
  );

  return;
};
