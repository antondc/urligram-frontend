import { usersReceive } from 'Modules/Users/actions/usersReceive';
import { UsersActions, UsersLoadApiResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsFollowingUsersRequest } from './sectionsFollowingUsersRequest';
import { sectionsFollowingUsersSuccess } from './sectionsFollowingUsersSuccess';

export const sectionsFollowingUsersLoad = (
  sessionId: string
): AppThunk<Promise<UserState[]>, UsersActions | SectionsActions> => async (
  dispatch,
  getState
): Promise<UserState[]> => {
  const { Sections: sectionsBeforeApi } = getState();
  try {
    dispatch(
      sectionsFollowingUsersRequest({
        ...sectionsBeforeApi,
        FollowingUsers: {
          ...sectionsBeforeApi.FollowingUsers,
          loading: true,
        },
      })
    );

    const { data }: UsersLoadApiResponse = await HttpClient.get(
      `/users/${sessionId}/following?sort=-createdat&page[size]=5`
    );
    const usersArray = data.map((item) => item.attributes);

    const { Users, Sections: sectionsAfterApi } = getState();
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
      sectionsFollowingUsersSuccess({
        ...sectionsAfterApi,
        FollowingUsers: {
          ...sectionsAfterApi.FollowingUsers,
          currentIds: data.map((item) => item.id),
          loading: false,
        },
      })
    );

    return usersArray;
  } catch (err) {
    throw new Error(err);
  }
};
