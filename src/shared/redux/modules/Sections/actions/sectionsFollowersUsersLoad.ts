import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { usersReceive } from 'Modules/Users/actions/usersReceive';
import { UsersActions, UsersLoadApiResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsFollowersUsersReceive } from './sectionsFollowersUsersReceive';
import { sectionsFollowersUsersRequest } from './sectionsFollowersUsersRequest';

export const sectionsFollowersUsersLoad = (userId: string): AppThunk<Promise<UserState[]>> => async (
  dispatch: Dispatch<UsersActions | SectionsActions>,
  getState: () => RootState
): Promise<UserState[]> => {
  if (!userId) return;
  try {
    dispatch(sectionsFollowersUsersRequest());

    const { data }: UsersLoadApiResponse = await HttpClient.get(
      `/users/${userId}/followers?sort=-createdat&page[size]=5`
    );
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
      sectionsFollowersUsersReceive({
        FollowersUsers: {
          currentIds: data.map((item) => item.id),
        },
      })
    );

    return usersArray;
  } catch (err) {
    throw new Error(err);
  }
};
