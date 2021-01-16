import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ReceiveLinksResponse } from 'Modules/Links/links.types';
import HttpClient from 'Services/HttpClient';
import { receiveLinks } from './receiveLinks';
import { requestLinks } from './requestLinks';

const linksSerializerByKey = (data) => data.reduce((acc, curr) => ({ ...acc, ...{ [curr.id]: curr.attributes } }), {});

export const loadLinks = (): ThunkAction<any, any, any, Action> => async (dispatch?: Dispatch) => {
  if (isBrowser) {
    dispatch(requestLinks());

    const response = await HttpClient.get<ReceiveLinksResponse>('/links');

    const linksByKey = {
      byKey: linksSerializerByKey(response.data),
    };

    dispatch(receiveLinks(linksByKey));

    return;
  }

  const response = await HttpClient.get('/links');

  const linksByKey = linksSerializerByKey(response.data);

  const result = {
    Links: {
      byKey: linksByKey,
    },
  };

  return result;
};
