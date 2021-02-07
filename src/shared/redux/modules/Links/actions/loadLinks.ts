import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { LinkState, ReceiveLinkItem, ReceiveLinksResponse } from 'Modules/Links/links.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { receiveLinks } from './receiveLinks';
import { requestLinks } from './requestLinks';

export const loadLinks = (): ThunkAction<any, any, any, Action> => async (dispatch?: Dispatch) => {
  try {
    dispatch(requestLinks());

    const { data }: ReceiveLinksResponse = await HttpClient.get(`/links${window.location.search}`);

    const linksByKey = {
      byKey: serializerFromArrayToByKey<ReceiveLinkItem, LinkState>({
        data: data,
        contentPath: 'attributes',
      }),
      allIds: data.map((item) => item.id),
    };
    dispatch(receiveLinks(linksByKey));
  } catch (err) {
    throw new Error(err);
  }

  return;
};
