import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { UsersActions, UsersLoadApiResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { usersReceive } from './usersReceive';
import { usersRequest } from './usersRequest';

export const userFollowersLoad = (userId: string): AppThunk<Promise<UserState[]>> => async (
  dispatch: Dispatch<UsersActions>,
  getState: () => RootState
): Promise<UserState[]> => {
  const { Users } = getState();
  try {
    dispatch(
      usersRequest({
        ...Users,
        meta: {
          ...Users.meta,
          sort: undefined,
        },
        loading: true,
      })
    );

    const { meta, data } = await HttpClient.get<void, UsersLoadApiResponse>(
      `/users/${userId}/followers${window.location.search}`
    );
    const usersArray = data.map((item) => item.attributes);

    const { Users: UsersAfterApiCall } = getState();
    dispatch(
      usersReceive({
        ...UsersAfterApiCall,
        byKey: {
          ...UsersAfterApiCall.byKey,
          ...serializerFromArrayToByKey<UserState, UserState>({
            data: usersArray,
          }),
        },
        currentIds: data.map((item) => item.id),
        meta,
        loading: false,
      })
    );

    return usersArray;
  } catch (err) {
    throw new Error(err);
  }
};
