import { usersReceive } from 'Modules/Users/actions/usersReceive';
import { UsersActions, UsersLoadApiResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsFollowersUsersRequest } from './sectionsFollowersUsersRequest';
import { sectionsFollowersUsersSuccess } from './sectionsFollowersUsersSuccess';

export const sectionsFollowersUsersLoad = (
  userId: string
): AppThunk<Promise<UserState[]>, UsersActions | SectionsActions> => async (
  dispatch,
  getState
): Promise<UserState[]> => {
  if (!userId) return;
  const { Sections: sectionsBeforeApi } = getState();
  try {
    dispatch(
      sectionsFollowersUsersRequest({
        ...sectionsBeforeApi,
        FollowersUsers: {
          ...sectionsBeforeApi.FollowersUsers,
          loading: true,
        },
      })
    );

    const { data }: UsersLoadApiResponse = await HttpClient.get(
      `/users/${userId}/followers?sort=-createdAt&page[size]=5`
    );
    const { Users: usersAfterApi, Sections: sectionsAfterApi } = getState();
    const usersArray = data?.map((item) => item.attributes);

    dispatch(
      usersReceive({
        ...usersAfterApi,
        byKey: {
          ...usersAfterApi.byKey,
          ...serializerFromArrayToByKey<UserState, UserState>({
            data: usersArray,
          }),
        },
        loading: false,
      })
    );

    dispatch(
      sectionsFollowersUsersSuccess({
        ...sectionsAfterApi,
        FollowersUsers: {
          ...sectionsAfterApi.FollowersUsers,
          currentIds: data?.map((item) => item.id),
          loading: false,
        },
      })
    );

    return usersArray;
  } catch (err) {
    throw new Error(err);
  }
};
