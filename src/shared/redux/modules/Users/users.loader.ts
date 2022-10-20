import { NetworkError } from 'Root/src/shared/types/error/NetworkError';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from '@antoniodcorrea/utils';
import { UsersLoadApiItemResponse, UsersLoadApiResponse, UsersState, UserState } from './users.types';

export const initialUsersLoader = async (): Promise<{ Users: UsersState }> => {
  try {
    const { data }: UsersLoadApiResponse = await HttpClient.get('/users');

    const usersByKey = serializerFromArrayToByKey<UsersLoadApiItemResponse, UserState>({
      data,
      contentPath: 'attributes',
    });

    const result = {
      Users: {
        byKey: usersByKey,
        allIds: data?.map((item) => item.id),
        loading: false,
      },
    };

    return result;
  } catch (error) {
    throw new NetworkError('Error when loading lusersists');
  }
};
