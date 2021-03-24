import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { receiveUsers } from 'Modules/Users/actions/receiveUsers';
import { ReceiveUserItem, ReceiveUsersResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { sectionsMostFollowedUsersReceive } from './sectionsMostFollowedUsersReceive';
import { sectionsMostFollowedUsersRequest } from './sectionsMostFollowedUsersRequest';

export const sectionsMostFollowedUsersLoad = (): ThunkAction<any, any, any, Action> => async (dispatch?: Dispatch) => {
  try {
    dispatch(sectionsMostFollowedUsersRequest());

    const { data }: ReceiveUsersResponse = await HttpClient.get('/users?sort=-followers&page[size]=5');

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
  } catch (err) {
    throw new Error(err);
  }

  return;
};
