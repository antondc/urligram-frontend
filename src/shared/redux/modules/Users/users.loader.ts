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
    console.log('Error when loading lusersists');
  }
};
