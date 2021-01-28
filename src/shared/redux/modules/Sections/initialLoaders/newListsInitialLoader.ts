import { ListState, ReceiveListItem, ReceiveListsResponse } from 'Modules/Lists/lists.types';
import { SectionsState } from 'Modules/Sections/sections.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';

export const newListsInitialLoader = async (): Promise<{ Sections: SectionsState }> => {
  const { data: newListsData }: ReceiveListsResponse = await HttpClient.get('/lists?sort=-createdAt&page[size]=5');

  const ListsByKey = {
    byKey: {
      ...serializerFromArrayToByKey<ReceiveListItem, ListState>({
        data: newListsData,
        contentPath: 'attributes',
      }),
    },
  };

  const result = {
    Lists: ListsByKey,
    Sections: {
      NewLists: {
        currentIds: newListsData.map((item) => item.id),
      },
    },
  };

  return result;
};
