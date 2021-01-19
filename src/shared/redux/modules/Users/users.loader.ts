import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { ReceiveUserItem, ReceiveUsersResponse, UsersState, UserState } from './users.types';

export const initialUsersLoader = async (): Promise<{ Users: UsersState }> => {
  const { data }: ReceiveUsersResponse = await HttpClient.get('/users');

  const usersByKey = serializerFromArrayToByKey<ReceiveUserItem, UserState>({ data });

  const result = {
    Users: {
      byKey: usersByKey,
      allIds: data.map((item) => item.id),
    },
  };

  return result;
};
