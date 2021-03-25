import { usersReceive } from 'Modules/Users/actions/usersReceive';
import { UsersActions, UsersLoadApiResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { SectionsActions } from '../sections.types';
import { sectionsMostFollowedUsersRequest } from './sectionsMostFollowedUsersRequest';
import { sectionsMostFollowedUsersSuccess } from './sectionsMostFollowedUsersSuccess';

export const sectionsMostFollowedUsersLoad = (): AppThunk<
  Promise<UserState[]>,
  UsersActions | SectionsActions
> => async (dispatch, getState): Promise<UserState[]> => {
  const { Sections: sectionsBeforeApi } = getState();
  try {
    dispatch(
      sectionsMostFollowedUsersRequest({
        ...sectionsBeforeApi,
        MostFollowedUsers: {
          ...sectionsBeforeApi.MostFollowedUsers,
          loading: true,
        },
      })
    );

    const { data } = await HttpClient.get<void, UsersLoadApiResponse>('/users?sort=-followers&page[size]=5');
    const usersArray = data.map((item) => item.attributes);
    const { Sections: sectionsAfterApi, Users: usersAfterApi } = getState();

    dispatch(
      usersReceive({
        ...usersAfterApi,
        byKey: {
          ...usersAfterApi.byKey,
          ...serializerFromArrayToByKey<UserState, UserState>({ data: usersArray }),
        },
        loading: false,
      })
    );

    dispatch(
      sectionsMostFollowedUsersSuccess({
        ...sectionsAfterApi,
        MostFollowedUsers: {
          ...sectionsAfterApi.MostFollowedUsers,
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
