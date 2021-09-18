import {
  USERS_LOAD_REQUEST,
  USERS_LOAD_SUCCEED,
  UsersActions,
  UsersLoadApiResponse,
  UserState,
} from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { QueryStringWrapper } from 'Services/QueryStringWrapper';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';

export const usersLoadByIds =
  (userIds: string[]): AppThunk<Promise<UserState[]>, UsersActions> =>
  async (dispatch, getState): Promise<UserState[]> => {
    try {
      const { Users: usersBeforeRequest } = getState();

      dispatch({
        type: USERS_LOAD_REQUEST,
        payload: usersBeforeRequest,
      });

      const queryString = QueryStringWrapper.stringifyQueryParams({ userIds });
      const { data } = await HttpClient.get<void, UsersLoadApiResponse>(`/users/ids?${queryString}`);

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
        },
      });

      return usersArray;
    } catch (error) {
      throw error;
    }
  };
