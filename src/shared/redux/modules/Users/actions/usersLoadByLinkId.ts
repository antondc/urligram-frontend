import {
  USERS_LOAD_REQUEST,
  USERS_LOAD_SUCCEED,
  UsersActions,
  UsersLoadApiResponse,
  UserState,
} from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { QueryStringWrapper } from '@antoniodcorrea/utils';
import { AppThunk } from '../../..';

interface Params {
  linkId: number;
  sortParam?: string;
}

export const usersLoadByLinkId =
  ({ linkId, sortParam }: Params): AppThunk<Promise<UserState[]>, UsersActions> =>
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

      const queryString = QueryStringWrapper.stringifyQueryParams({ sort: sortParam });

      console.log('=======');
      console.log('sortParam:');
      console.log(JSON.stringify(sortParam, null, 4));
      console.log('queryString:');
      console.log(JSON.stringify(queryString, null, 4));

      const {
        data,
        meta: { totalItems, sort },
      } = await HttpClient.get<void, UsersLoadApiResponse>(`/links/${linkId}/users?${queryString}`);

      console.log('sort:');
      console.log(JSON.stringify(sort, null, 4));
      console.log('=======');

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
          meta: {
            totalItems,
            sort,
          },
        },
      });

      return usersArray;
    } catch (error) {
      throw error;
    }
  };
