import {
  USERS_LOAD_REQUEST,
  USERS_LOAD_SUCCEED,
  UsersActions,
  UsersLoadApiResponse,
  UserState,
} from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';

export const usersLoadByLinkId =
  (linkId: number): AppThunk<Promise<UserState[]>, UsersActions> =>
  async (dispatch, getState): Promise<UserState[]> => {
    try {
      const { Users: usersBeforeRequest } = getState();

      dispatch({
        type: USERS_LOAD_REQUEST,
        payload: {
          ...usersBeforeRequest,
          loading: true,
        },
      });

      const { data } = await HttpClient.get<void, UsersLoadApiResponse>(
        `/links/${linkId}/users?${window.location.search}`
      );

      const { Users: usersAfterResponse } = getState();
      const usersArray = data?.map((item) => item.attributes);

      dispatch({
        type: USERS_LOAD_SUCCEED,
        payload: {
          ...usersAfterResponse,
          byKey: {
            ...usersAfterResponse.byKey,
            ...serializerFromArrayToByKey<UserState, UserState>({ data: usersArray }),
          },
          currentIds: data?.map((item) => item.id),
          loading: false,
        },
      });

      return usersArray;
    } catch (error) {
      throw error;
    }
  };
