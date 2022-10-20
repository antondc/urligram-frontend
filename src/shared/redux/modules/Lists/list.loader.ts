import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import { NetworkError } from 'Root/src/shared/types/error/NetworkError';
import HttpClient from 'Services/HttpClient';
import { QueryStringWrapper, serializerFromArrayToByKey } from '@antoniodcorrea/utils';
import { BookmarksGetApiResponse, BookmarkState } from '../Bookmarks/bookmarks.types';
import { ListLoadApiResponse, ListsState } from './lists.types';

export const initialListLoader = async ({ query, params }: RequestParameters = {}): Promise<{
  Lists: ListsState;
}> => {
  try {
    const { data: listData } = await HttpClient.get<void, ListLoadApiResponse>(
      `/lists/${params.listId}/?${QueryStringWrapper.stringifyQueryParams(query)}`
    );

    console.log('=======');
    console.log('listData:');
    console.log(JSON.stringify(listData, null, 4));
    console.log('=======');

    const {
      meta: { totalItems, sort },
      data: bookmarksData,
    } = await HttpClient.get<any, BookmarksGetApiResponse>(
      `/lists/${params?.listId}/bookmarks?${QueryStringWrapper.stringifyQueryParams(query)}`
    );

    console.log('=======');
    console.log('bookmarksData:');
    console.log(JSON.stringify(bookmarksData, null, 4));
    console.log('=======');

    const bookmarksArray = bookmarksData.map((item) => item.attributes);

    console.log('=======');
    console.log('bookmarksArray:');
    console.log(JSON.stringify(bookmarksArray, null, 4));
    console.log('=======');

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

    console.log('=======');
    console.log('result:');
    console.log(JSON.stringify(result, null, 4));
    console.log('=======');

    return result;
  } catch (error) {
    throw new NetworkError('Error when loading lists', error);
  }
};
