import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { LinksState, LinkState, ReceiveLinkItem, ReceiveLinksResponse } from './links.types';

export const initialLinksLoader = async (): Promise<{ Links: LinksState }> => {
  const { data }: ReceiveLinksResponse = await HttpClient.get('/links');

  const linksByKey = serializerFromArrayToByKey<ReceiveLinkItem, LinkState>({ data });

  const result = {
    Links: {
      byKey: linksByKey,
      allIds: data.map((item) => item.id),
      loading: true,
    },
  };

  return result;
};
