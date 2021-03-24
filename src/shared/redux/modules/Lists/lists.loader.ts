import { stringify } from 'qs';

import { ListApiResponseItem, ListsLoadApiResponse, ListsState, ListState } from 'Modules/Lists/lists.types';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';

export const initialListsLoader = async ({ query }: RequestParameters = {}): Promise<{
  Lists: ListsState;
}> => {
  const { data }: ListsLoadApiResponse = await HttpClient.get('/lists?' + stringify(query));

  const result = {
    Lists: {
      byKey: serializerFromArrayToByKey<ListApiResponseItem, ListState>({
        data: data,
        contentPath: 'attributes',
      }),
      currentIds: data.map((item) => item.id),
      loading: true,
    },
  };

  return result;
};
