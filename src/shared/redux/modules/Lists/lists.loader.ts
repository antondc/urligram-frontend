import { stringify } from 'qs';

import { ListApiResponseItem, ListsLoadApiResponse, ListsState, ListState } from 'Modules/Lists/lists.types';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from '@antoniodcorrea/utils';

export const initialListsLoader = async ({ query }: RequestParameters = {}): Promise<{
  Lists: ListsState;
}> => {
  try {
    const { data }: ListsLoadApiResponse = await HttpClient.get('/lists?' + stringify(query));

    const result = {
      Lists: {
        byKey: serializerFromArrayToByKey<ListApiResponseItem, ListState>({
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
