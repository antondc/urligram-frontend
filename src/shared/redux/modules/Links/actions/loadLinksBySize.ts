import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { LinkState, ReceiveLinkItem, ReceiveLinksResponse } from 'Modules/Links/links.types';
import { URLWrapper } from 'Root/src/shared/services/URLWrapper';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { receiveLinks } from './receiveLinks';
import { requestLinks } from './requestLinks';

export const loadLinksBySize = (size: number): ThunkAction<any, any, any, Action> => async (dispatch?: Dispatch) => {
  try {
    dispatch(requestLinks());

    const url = new URLWrapper('/links');
    url.upsertSearchParam('page[size]', size);

    const apiEndpoint = url.getPathAndSearch();

    const {
      meta: { totalItems, sort },
      data,
    }: ReceiveLinksResponse = await HttpClient.get(apiEndpoint);

    const linksByKey = {
      byKey: serializerFromArrayToByKey<ReceiveLinkItem, LinkState>({
        data: data,
        contentPath: 'attributes',
      }),
      allIds: data.map((item) => item.id),
      meta: {
        totalItems,
        sort,
      },
    };
    dispatch(receiveLinks(linksByKey));
  } catch (err) {
    throw new Error(err);
  }

  return;
};
