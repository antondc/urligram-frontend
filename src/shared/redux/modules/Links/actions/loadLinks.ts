import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { LinkState, ReceiveLinkItem, ReceiveLinksResponse } from 'Modules/Links/links.types';
import HttpClient from 'Services/HttpClient';
import { URLWrapper } from 'Services/URLWrapper';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { receiveLinks } from './receiveLinks';
import { requestLinks } from './requestLinks';

export const loadLinks = (size?: number): ThunkAction<any, any, any, Action> => async (dispatch?: Dispatch) => {
  try {
    dispatch(requestLinks());

    const path = `/links${window.location.search}`;
    const urlObject = new URLWrapper(path);
    !!size && urlObject.upsertSearchParam('page[size]', size);
    const apiEndpoint = urlObject.getPathAndSearch();

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
