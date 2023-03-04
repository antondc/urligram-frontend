import {
  BookmarkGetItemResponse,
  BookmarksGetApiResponse,
  BookmarksState,
  BookmarkState,
} from 'Modules/Bookmarks/bookmarks.types';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import HttpClient from 'Services/HttpClient';
import { noop, QueryStringWrapper, serializerFromArrayToByKey } from '@antoniodcorrea/utils';

export const initialBookmarksLoader = async ({ query }: RequestParameters = {}): Promise<{
  Bookmarks: BookmarksState;
}> => {
  try {
    const { data }: BookmarksGetApiResponse = await HttpClient.get(
      `/bookmarks?${QueryStringWrapper.stringifyQueryParams(query)}`
    );

    const result = {
      Bookmarks: {
        byKey: serializerFromArrayToByKey<BookmarkGetItemResponse, BookmarkState>({
          data: data,
          contentPath: 'attributes',
        }),
        currentIds: data?.map((item) => item.id),
        loading: false,
      },
    };

    return result;
  } catch (error) {
    noop();
  }
};
