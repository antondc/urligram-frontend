import { stringify } from 'qs';

import { UserLoadApiResponse, UsersState } from 'Modules/Users/users.types';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import { NotFoundError } from 'Root/src/shared/types/error/NotFoundError';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { BookmarkGetItemResponse, BookmarksGetApiResponse, BookmarkState } from '../Bookmarks/bookmarks.types';

export const initialUserLoader = async ({ query, params }: RequestParameters = {}): Promise<{
  Users: UsersState;
}> => {
  try {
    const { data: userData }: UserLoadApiResponse = await HttpClient.get(
      '/users/' + params?.userId + '?' + stringify(query)
    );

    const { data: bookmarksData }: BookmarksGetApiResponse = await HttpClient.get(
      '/users/' + params?.userId + '/bookmarks' + '?' + stringify(query)
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
        loading: true,
      },
      Bookmarks: {
        byKey: serializedBookmarks,
        currentIds: bookmarksData.map((item) => item.id),
        loading: true,
      },
    };

    return result;
  } catch (error) {
    throw new NotFoundError('Not Found');
  }
};
