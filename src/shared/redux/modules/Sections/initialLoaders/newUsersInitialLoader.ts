import { SectionsState } from 'Modules/Sections/sections.types';
import { ReceiveUserItem, ReceiveUsersResponse, UserState } from 'Modules/Users/users.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';

export const newUsersInitialLoader = async (): Promise<{ Sections: SectionsState }> => {
  const { data: usersData }: ReceiveUsersResponse = await HttpClient.get('/users?sort=-createdAt&page[size]=5');

  const UsersByKey = {
    byKey: {
      ...serializerFromArrayToByKey<ReceiveUserItem, UserState>({
        data: usersData,
        contentPath: 'attributes',
      }),
    },
  };

  const result = {
    Sections: {
      NewUsers: {
        currentIds: usersData.map((item) => item.id),
      },
    },
    Users: UsersByKey,
  };

  return result;
};
