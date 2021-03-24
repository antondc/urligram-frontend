import { Dispatch } from 'redux';

import { RootState } from 'Modules/rootType';
import { usersReceive } from 'Modules/Users/actions/usersReceive';
import { UsersActions, UsersLoadApiResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsFollowingUsersReceive } from './sectionsFollowingUsersReceive';
import { sectionsFollowingUsersRequest } from './sectionsFollowingUsersRequest';

export const sectionsFollowingUsersLoad = (sessionId: string): AppThunk<Promise<UserState[]>> => async (
  dispatch: Dispatch<UsersActions | SectionsActions>,
  getState: () => RootState
): Promise<UserState[]> => {
  try {
    dispatch(sectionsFollowingUsersRequest());

    const { data }: UsersLoadApiResponse = await HttpClient.get(
      `/users/${sessionId}/following?sort=-createdat&page[size]=5`
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
            contentPath: 'attributes',
          }),
        },
        loading: false,
      })
    );

    dispatch(
      sectionsFollowingUsersReceive({
        FollowingUsers: {
          currentIds: data.map((item) => item.id),
        },
      })
    );

    return usersArray;
  } catch (err) {
    throw new Error(err);
  }
};
