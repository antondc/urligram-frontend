import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { LinkState, ReceiveLinkItem, ReceiveLinksResponse } from 'Modules/Links/links.types';
import { RootState } from 'Modules/rootType';
import HttpClient from 'Services/HttpClient';
import { QueryStringWrapper } from 'Services/QueryStringWrapper';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { receiveLinks } from './receiveLinks';
import { requestLinks } from './requestLinks';

export const loadLinks = (size?: number): ThunkAction<any, any, any, Action> => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  try {
    const { Links: linksState } = getState();
    const linksActiveSort = linksState?.meta?.sort;

    dispatch(requestLinks());

    const queryStringUpdated = QueryStringWrapper.addSearchParamsNoReplace(window.location.search, {
      page: { size },
      sort: linksActiveSort,
    });

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
