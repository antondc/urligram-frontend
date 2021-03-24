import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { LinksState, LinkState, LinkApiResponseItem, LinksApiResponse } from './links.types';

export const initialLinksLoader = async (): Promise<{ Links: LinksState }> => {
  const { data }: LinksApiResponse = await HttpClient.get('/links');

  const linksByKey = serializerFromArrayToByKey<LinkApiResponseItem, LinkState>({ data });

  const result = {
    Links: {
      byKey: linksByKey,
      allIds: data.map((item) => item.id),
      loading: true,
    },
  };

  return result;
};
