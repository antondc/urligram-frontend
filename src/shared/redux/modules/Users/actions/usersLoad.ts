import { UsersActions, UsersLoadApiResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { usersReceive } from './usersReceive';
import { usersRequest } from './usersRequest';

export const usersLoad = (): AppThunk<Promise<UserState[]>, UsersActions> => async (
  dispatch,
  getState
): Promise<UserState[]> => {
  const APIBaseEndpoint = '/users';

  try {
    dispatch(
      usersRequest({
        ...getState().Users,
        loading: true,
        meta: {
          ...getState().Users.meta,
          sort: undefined,
        },
      })
    );

    const { meta, data } = await HttpClient.get<void, UsersLoadApiResponse>(APIBaseEndpoint + window.location.search);

    const usersArray = data?.map((item) => item.attributes);

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
        currentIds: data?.map((item) => item.id),
        meta,
        loading: false,
      })
    );

    return usersArray;
  } catch (error) {
    throw error;
  }
};
