import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { LinkState, ReceiveLinkItem, ReceiveLinksResponse } from 'Modules/Links/links.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { receiveLinks } from './receiveLinks';
import { requestLinks } from './requestLinks';

export const loadLinks = (): ThunkAction<any, any, any, Action> => async (dispatch?: Dispatch) => {
  dispatch(requestLinks());

  const { data }: ReceiveLinksResponse = await HttpClient.get('/links');

  const linksByKey = {
    byKey: serializerFromArrayToByKey<ReceiveLinkItem, LinkState>({
      data: data,
      contentPath: 'attributes',
    }),
  };
  dispatch(receiveLinks(linksByKey));

  return;
};
