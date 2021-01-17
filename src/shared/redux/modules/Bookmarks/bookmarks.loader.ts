import { stringify } from 'qs';

import {
  BookmarksState,
  BookmarkState,
  ReceiveBookmarkItem,
  ReceiveBookmarksResponse,
} from 'Modules/Bookmarks/bookmarks.types';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';

export const initialBookmarksLoader = async ({ query }: RequestParameters = {}): Promise<{ Bookmarks: BookmarksState }> => {
  const APIBaseEndpoint = '/bookmarks';

  const { data }: ReceiveBookmarksResponse = await HttpClient.get(APIBaseEndpoint + '?' + stringify(query));
  const bookmarksByKey = {
    byKey: serializerFromArrayToByKey<ReceiveBookmarkItem, BookmarkState>({
      data: data,
      contentPath: 'attributes',
    }),
  };

  const result = {
    Bookmarks: bookmarksByKey,
  };

  return result;
};
