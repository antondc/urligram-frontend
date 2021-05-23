import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { LinkApiResponseItem, LinksApiResponse, LinksState, LinkState } from './links.types';

export const initialLinksLoader = async (): Promise<{ Links: LinksState }> => {
  const { data }: LinksApiResponse = await HttpClient.get('/links');

  const linksByKey = serializerFromArrayToByKey<LinkApiResponseItem, LinkState>({ data });

  const result = {
    Links: {
      byKey: linksByKey,
      allIds: data?.map((item) => item.id),
      loading: true,
    },
  };

  return result;
};
