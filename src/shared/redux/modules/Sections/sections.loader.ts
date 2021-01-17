import { SectionsState } from 'Modules/Sections/sections.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { ListState, ReceiveListItem, ReceiveListsResponse } from '../Lists/lists.types';

export const initialPopularListsLoader = async (): Promise<{ Sections: SectionsState }> => {
  const { data }: ReceiveListsResponse = await HttpClient.get('/lists?sort=-members&page[size]=5');

  const popularListsByKey = {
    byKey: serializerFromArrayToByKey<ReceiveListItem, ListState>({ data, contentPath: 'attributes' }),
  };

  const result = {
    Sections: {
      PopularLists: popularListsByKey,
    },
  };

  return result;
};
