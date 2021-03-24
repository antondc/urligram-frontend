import { SectionsState } from 'Modules/Sections/sections.types';
import { UsersLoadApiItemResponse, UsersLoadApiResponse, UserState } from 'Modules/Users/users.types';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';

export const followingUsersInitialLoader = async ({ params }: RequestParameters = {}): Promise<{
  Sections: SectionsState;
}> => {
  const { data: usersData }: UsersLoadApiResponse = await HttpClient.get(
    `/users/${params?.userId}/following?sort=-createdat&page[size]=5`
  );

  const UsersByKey = {
    byKey: {
      ...serializerFromArrayToByKey<UsersLoadApiItemResponse, UserState>({
        data: usersData,
        contentPath: 'attributes',
      }),
    },
  };

  const result = {
    Sections: {
      FollowingUsers: {
        currentIds: usersData.map((item) => item.id),
      },
    },
    Users: UsersByKey,
  };

  return result;
};
