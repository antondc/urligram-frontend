import { ListState, ReceiveListItem, ReceiveListsResponse } from 'Modules/Lists/lists.types';
import { SectionsState } from 'Modules/Sections/sections.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';

export const popularListsInitialLoader = async (): Promise<{ Sections: SectionsState }> => {
  const { data: popularListsData }: ReceiveListsResponse = await HttpClient.get('/lists?sort=-members&page[size]=5');

  const ListsByKey = {
    byKey: {
      ...serializerFromArrayToByKey<ReceiveListItem, ListState>({
        data: popularListsData,
        contentPath: 'attributes',
      }),
    },
  };

  const result = {
    Lists: ListsByKey,
    Sections: {
      PopularLists: {
        currentIds: popularListsData.map((item) => item.id),
      },
    },
  };

  return result;
};
