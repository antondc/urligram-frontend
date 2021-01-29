import { ListState, ReceiveListItem, ReceiveListsResponse } from 'Modules/Lists/lists.types';
import { SectionsState } from 'Modules/Sections/sections.types';
import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';

export const myListsInitialLoader = async ({ params }: RequestParameters = {}): Promise<{
  Sections: SectionsState;
}> => {
  if (!params?.sessionId) return;

  const { data: myListsData }: ReceiveListsResponse = await HttpClient.get(
    `/users/${params?.sessionId}/lists?page[size]=5&filter[role]=admin`
  );

  const ListsByKey = {
    byKey: {
      ...serializerFromArrayToByKey<ReceiveListItem, ListState>({
        data: myListsData,
        contentPath: 'attributes',
      }),
    },
  };

  const result = {
    Lists: ListsByKey,
    Sections: {
      MyLists: {
        currentIds: myListsData.map((item) => item.id),
      },
    },
  };

  return result;
};
