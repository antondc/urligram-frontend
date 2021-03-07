import { stringify } from 'qs';

import { ReceiveUserResponse, UsersState } from 'Modules/Users/users.types';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import { serializerFromArrayToByKey } from 'Root/src/shared/tools/utils/serializers/serializerFromArrayToByKey';
import HttpClient from 'Services/HttpClient';
import { BookmarkState, ReceiveBookmarkItem, ReceiveBookmarksResponse } from '../Bookmarks/bookmarks.types';

export const initialUserLoader = async ({ query, params }: RequestParameters = {}): Promise<{
  Users: UsersState;
}> => {
  const { data: userData }: ReceiveUserResponse = await HttpClient.get(
    '/users/' + params?.userId + '?' + stringify(query)
  );
  const { data: bookmarksData }: ReceiveBookmarksResponse = await HttpClient.get(
    '/users/' + params?.userId + '/bookmarks' + '?' + stringify(query)
  );

  const serializedBookmarks = serializerFromArrayToByKey<ReceiveBookmarkItem, BookmarkState>({
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
};
