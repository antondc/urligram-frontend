import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { usersReceive } from 'Modules/Users/actions/usersReceive';
import { UsersActions, UsersLoadApiResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsUsersInThisListReceive } from './sectionsUsersInThisListReceive';
import { sectionsUsersInThisListRequest } from './sectionsUsersInThisListRequest';

export const sectionsUsersInThisListLoad = (userIds: string[]): AppThunk<Promise<UserState[]>> => async (
  dispatch: Dispatch<UsersActions | SectionsActions>,
  getState: () => RootState
): Promise<UserState[]> => {
  try {
    dispatch(sectionsUsersInThisListRequest());

    const { data } = await HttpClient.get<void, UsersLoadApiResponse>('/users/ids', {
      params: {
        userIds,
      },
    });

    const usersArray = data.map((item) => item.attributes);

    const { Users } = getState();
    dispatch(
      usersReceive({
        ...Users,
        byKey: {
          ...Users.byKey,
          ...serializerFromArrayToByKey<UserState, UserState>({
            data: usersArray,
          }),
        },
        loading: false,
      })
    );
    dispatch(
      sectionsUsersInThisListReceive({
        UsersInThisList: {
          currentIds: data.map((item) => item.id),
        },
      })
    );

    return usersArray;
  } catch (err) {
    throw new Error(err);
  }
};
