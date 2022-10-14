import { stringify } from 'qs';

import {
  BookmarkGetItemResponse,
  BookmarksGetApiResponse,
  BookmarksState,
  BookmarkState,
} from 'Modules/Bookmarks/bookmarks.types';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';

export const initialBookmarksLoader = async ({ query }: RequestParameters = {}): Promise<{
  Bookmarks: BookmarksState;
}> => {
  try {
    const { data }: BookmarksGetApiResponse = await HttpClient.get(`/bookmarks?${stringify(query)}`);

    const result = {
      Bookmarks: {
        byKey: serializerFromArrayToByKey<BookmarkGetItemResponse, BookmarkState>({
          data: data,
          contentPath: 'attributes',
        }),
        currentIds: data?.map((item) => item.id),
        loading: true,
      },
    };

    return result;
  } catch (error) {
    console.log(error);
  }
};
