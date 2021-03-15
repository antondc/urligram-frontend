import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { LinkState, ReceiveLinkItem, ReceiveLinksResponse } from 'Modules/Links/links.types';
import { QueryStringWrapper } from 'Root/src/shared/services/QueryStringWrapper';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { receiveLinks } from './receiveLinks';
import { requestLinks } from './requestLinks';

export const loadLinks = (size?: number): ThunkAction<any, any, any, Action> => async (dispatch?: Dispatch) => {
  try {
    dispatch(requestLinks());

    const queryStringUpdated = !!size
      ? QueryStringWrapper.upsertSearchParams(window.location.search, { page: { size } })
      : QueryStringWrapper.extractQueryString(window.location.search);
    
    const {
      meta: { totalItems, sort },
      data,
    }: ReceiveLinksResponse = await HttpClient.get(`/links?${queryStringUpdated}`);

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
