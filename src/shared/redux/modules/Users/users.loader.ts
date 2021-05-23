import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { UsersLoadApiItemResponse, UsersLoadApiResponse, UsersState, UserState } from './users.types';

export const initialUsersLoader = async (): Promise<{ Users: UsersState }> => {
  const { data }: UsersLoadApiResponse = await HttpClient.get('/users');

  const usersByKey = serializerFromArrayToByKey<UsersLoadApiItemResponse, UserState>({
    data,
    contentPath: 'attributes',
  });

  const result = {
    Users: {
      byKey: usersByKey,
      allIds: data?.map((item) => item.id),
      loading: true,
    },
  };

  return result;
};
