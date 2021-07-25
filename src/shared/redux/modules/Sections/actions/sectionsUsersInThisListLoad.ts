import { usersReceive } from 'Modules/Users/actions/usersReceive';
import { UsersActions, UsersLoadApiResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { QueryStringWrapper } from 'Services/QueryStringWrapper';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsUsersInThisListReceive } from './sectionsUsersInThisListReceive';
import { sectionsUsersInThisListRequest } from './sectionsUsersInThisListRequest';

export const sectionsUsersInThisListLoad =
  (userIds: string[]): AppThunk<Promise<UserState[]>, UsersActions | SectionsActions> =>
  async (dispatch, getState): Promise<UserState[]> => {
    try {
      const { Sections: sectionsBeforeRequest } = getState();
      dispatch(
        sectionsUsersInThisListRequest({
          ...sectionsBeforeRequest,
          UsersInThisList: {
            ...sectionsBeforeRequest.UsersInThisList,
            loading: true,
          },
        })
      );

      const queryString = QueryStringWrapper.stringifyQueryParams({ userIds });
      const { data } = await HttpClient.get<void, UsersLoadApiResponse>(`/users/ids?${queryString}`);

      const { Users: usersAfterResponse, Sections: sectionsAfterResponse } = getState();
      const usersArray = data?.map((item) => item.attributes);

      dispatch(
        usersReceive({
          ...usersAfterResponse,
          byKey: {
            ...usersAfterResponse.byKey,
            ...serializerFromArrayToByKey<UserState, UserState>({ data: usersArray }),
          },
        })
      );
      dispatch(
        sectionsUsersInThisListReceive({
          UsersInThisList: {
            ...sectionsAfterResponse.UsersInThisList,
            currentIds: data?.map((item) => item.id),
            loading: false,
          },
        })
      );

      return usersArray;
    } catch (error) {
      throw error;
    }
  };
