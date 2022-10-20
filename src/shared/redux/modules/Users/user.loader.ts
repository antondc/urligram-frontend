import { UserLoadApiResponse, UsersState } from 'Modules/Users/users.types';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import { NetworkError } from 'Root/src/shared/types/error/NetworkError';
import HttpClient from 'Services/HttpClient';
import { QueryStringWrapper, serializerFromArrayToByKey } from '@antoniodcorrea/utils';
import { BookmarkGetItemResponse, BookmarksGetApiResponse, BookmarkState } from '../Bookmarks/bookmarks.types';

export const initialUserLoader = async ({ query, params }: RequestParameters = {}): Promise<{
  Users: UsersState;
}> => {
  try {
    const { data: userData }: UserLoadApiResponse = await HttpClient.get(
      '/users/' + params?.userId + '?' + QueryStringWrapper.stringifyQueryParams(query)
    );

    const { data: bookmarksData }: BookmarksGetApiResponse = await HttpClient.get(
      '/users/' + params?.userId + '/bookmarks' + '?' + QueryStringWrapper.stringifyQueryParams(query)
    );

    const serializedBookmarks = serializerFromArrayToByKey<BookmarkGetItemResponse, BookmarkState>({
      data: bookmarksData,
      contentPath: 'attributes',
    });

    const result = {
      Users: {
        byKey: {
          [userData?.attributes?.id]: {
            ...userData.attributes,
          },
        },
        currentIds: [userData?.attributes?.id],
        loading: false,
      },
      Bookmarks: {
        byKey: serializedBookmarks,
        currentIds: bookmarksData.map((item) => item.id),
        loading: false,
      },
    };

    return result;
  } catch (error) {
    throw new NetworkError('Error when loading user');
  }
};
