import {
  USERS_LOAD_FAILURE,
  USERS_LOAD_REQUEST,
  USERS_LOAD_SUCCEED,
  UsersActions,
  UsersLoadApiResponse,
  UserState,
} from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { QueryStringWrapper, serializerFromArrayToByKey } from '@antoniodcorrea/utils';
import { AppThunk } from '../../..';

export const usersLoadByIds =
  (userIds: string[]): AppThunk<Promise<UserState[]>, UsersActions> =>
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
          loading: false,
        },
      });

      return usersArray;
    } catch (error) {
      const { Users: UsersOnError } = getState();

      dispatch({
        type: USERS_LOAD_FAILURE,
        payload: {
          ...UsersOnError,
          loading: false,
          errors: [...(UsersOnError?.errors || []), error],
        },
      });

      throw error;
    }
  };
