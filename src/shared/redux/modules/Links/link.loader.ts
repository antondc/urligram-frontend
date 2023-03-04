import { RequestParameters } from 'Root/src/server/routes/allRoutes';
import HttpClient from 'Services/HttpClient';
import { noop, QueryStringWrapper } from '@antoniodcorrea/utils';
import { LinkGetApiResponse, LinksState } from './links.types';

export const initialLinkLoader = async ({ query, params }: RequestParameters = {}): Promise<{
  Links: LinksState;
}> => {
  try {
    const { data: linkData } = await HttpClient.get<void, LinkGetApiResponse>(
      `/links/${params?.linkId}?${QueryStringWrapper.stringifyQueryParams(query)}`
    );

    const result = {
      Links: {
        byKey: {
          [linkData?.attributes?.id]: {
            ...linkData.attributes,
          },
        },
        currentIds: [linkData?.attributes?.id],
        loading: false,
      },
    };

    return result;
  } catch (error) {
    noop();
  }
};
