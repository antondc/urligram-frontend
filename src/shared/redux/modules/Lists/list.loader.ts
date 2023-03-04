import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import HttpClient from 'Services/HttpClient';
import { noop, QueryStringWrapper, serializerFromArrayToByKey } from '@antoniodcorrea/utils';
import { BookmarksGetApiResponse, BookmarkState } from '../Bookmarks/bookmarks.types';
import { ListLoadApiResponse, ListsState } from './lists.types';

export const initialListLoader = async ({ query, params }: RequestParameters = {}): Promise<{
  Lists: ListsState;
}> => {
  try {
    const { data: listData } = await HttpClient.get<void, ListLoadApiResponse>(
      `/lists/${params.listId}/?${QueryStringWrapper.stringifyQueryParams(query)}`
    );

    const {
      meta: { totalItems, sort },
      data: bookmarksData,
    } = await HttpClient.get<any, BookmarksGetApiResponse>(
      `/lists/${params?.listId}/bookmarks?${QueryStringWrapper.stringifyQueryParams(query)}`
    );

    const bookmarksArray = bookmarksData.map((item) => item.attributes);

    const result = {
      Lists: {
        byKey: {
          [listData?.attributes?.id]: {
            ...listData.attributes,
          },
        },
        currentIds: [listData?.attributes?.id],
        loading: false,
      },
      Bookmarks: {
        byKey: {
          ...serializerFromArrayToByKey<BookmarkState, BookmarkState>({ data: bookmarksArray }),
        },
        currentIds: bookmarksData?.map((item) => item.id),
        loading: false,
        meta: {
          totalItems,
          sort,
        },
      },
    };

    return result;
  } catch (error) {
    noop();
  }
};
