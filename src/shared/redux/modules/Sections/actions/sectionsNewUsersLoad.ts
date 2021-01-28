import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ReceiveUserItem, ReceiveUsersResponse, UserState } from 'Modules/Users/users.types';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { receiveUsers } from '../../Users/actions/receiveUsers';
import { sectionsNewUsersReceive } from './sectionsNewUsersReceive';
import { sectionsNewUsersRequest } from './sectionsNewUsersRequest';

export const sectionsNewUsersLoad = (): ThunkAction<any, any, any, Action> => async (dispatch?: Dispatch) => {
  dispatch(sectionsNewUsersRequest());
  const { data }: ReceiveUsersResponse = await HttpClient.get('/users?sort=createdAt&page[size]=5');

  const newUsersByKey = {
    byKey: serializerFromArrayToByKey<ReceiveUserItem, UserState>({
      data: data,
      contentPath: 'attributes',
    }),
  };

  dispatch(receiveUsers(newUsersByKey));

  dispatch(
    sectionsNewUsersReceive({
      NewUsers: {
        currentIds: data.map((item) => item.id),
      },
    })
  );

  return;
};
