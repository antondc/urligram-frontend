import { UsersActions, UsersLoadApiResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { usersReceive } from './usersReceive';
import { usersRequest } from './usersRequest';

export const userFollowersLoad =
  ({ userId, rawData }: { userId: string; rawData?: boolean }): AppThunk<Promise<UserState[]>, UsersActions> =>
  async (dispatch, getState): Promise<UserState[]> => {
    if (!userId) return;

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
      const usersArray = data?.map((item) => item.attributes);

      const { Users: usersAfterApiCall } = getState();
      const updatedIds = rawData ? usersAfterApiCall.currentIds : data?.map((item) => item.id);

      dispatch(
        usersReceive({
          ...usersAfterApiCall,
          byKey: {
            ...usersAfterApiCall.byKey,
            ...serializerFromArrayToByKey<UserState, UserState>({
              data: usersArray,
            }),
          },
          currentIds: updatedIds,
          meta,
          loading: false,
        })
      );

      return usersArray;
    } catch (error) {
      throw error;
    }
  };
