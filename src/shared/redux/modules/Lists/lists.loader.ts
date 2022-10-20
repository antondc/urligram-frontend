import { ListApiResponseItem, ListsLoadApiResponse, ListsState, ListState } from 'Modules/Lists/lists.types';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import HttpClient from 'Services/HttpClient';
import { QueryStringWrapper, serializerFromArrayToByKey } from '@antoniodcorrea/utils';

export const initialListsLoader = async ({ query }: RequestParameters = {}): Promise<{
  Lists: ListsState;
}> => {
  try {
    const { data }: ListsLoadApiResponse = await HttpClient.get(
      '/lists?' + QueryStringWrapper.stringifyQueryParams(query)
    );

    const result = {
      Lists: {
        byKey: serializerFromArrayToByKey<ListApiResponseItem, ListState>({
          data: data,
          contentPath: 'attributes',
        }),
        currentIds: data?.map((item) => item.id),
        loading: false,
      },
    };

    return result;
  } catch (error) {
    console.log('Error when loading lists');
  }
};
