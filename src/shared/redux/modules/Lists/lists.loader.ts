import { stringify } from 'qs';

import { ListsState, ListState, ReceiveListItem, ReceiveListsResponse } from 'Modules/Lists/lists.types';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';

export const initialListsLoader = async ({ query }: RequestParameters = {}): Promise<{
  Lists: ListsState;
}> => {
  const { data }: ReceiveListsResponse = await HttpClient.get('/lists?' + stringify(query));

  const result = {
    Lists: {
      byKey: serializerFromArrayToByKey<ReceiveListItem, ListState>({
        data: data,
        contentPath: 'attributes',
      }),
      currentIds: data.map((item) => item.id),
    },
  };

  return result;
};
