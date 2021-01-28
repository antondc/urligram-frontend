import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ReceiveUserItem, ReceiveUsersResponse, UserState } from 'Modules/Users/users.types';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { receiveUsers } from '../../Users/actions/receiveUsers';
import { sectionsMostFollowedUsersReceive } from './sectionsMostFollowedUsersReceive';
import { sectionsMostFollowedUsersRequest } from './sectionsMostFollowedUsersRequest';

export const sectionsMostFollowedUsersLoad = (): ThunkAction<any, any, any, Action> => async (dispatch?: Dispatch) => {
  dispatch(sectionsMostFollowedUsersRequest());
  const { data }: ReceiveUsersResponse = await HttpClient.get('/users?sort=-createdAt&page[size]=5');

  const mostFollowedUsersByKey = {
    byKey: serializerFromArrayToByKey<ReceiveUserItem, UserState>({
      data: data,
      contentPath: 'attributes',
    }),
  };

  dispatch(receiveUsers(mostFollowedUsersByKey));

  dispatch(
    sectionsMostFollowedUsersReceive({
      MostFollowedUsers: {
        currentIds: data.map((item) => item.id),
      },
    })
  );

  return;
};
