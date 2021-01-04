import { Dispatch } from 'redux';

import { ReceiveLinksResponse } from 'Modules/Links/links.types';
import HttpClient from 'Root/src/shared/services/HttpClient';
import { receiveLinks } from './receiveLinks';
import { requestLinks } from './requestLinks';

const linksSerializerByKey = (data) => data.reduce((acc, curr) => ({ ...acc, ...{ [curr.id]: curr.attributes } }), {});

export const loadLinks = () => async (dispatch?: Dispatch) => {
  if (isBrowser) {
    const response = await HttpClient.get<ReceiveLinksResponse>('/links');

    const linksByKey = {
      byKey: linksSerializerByKey(response.data),
    };

    dispatch(requestLinks());
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
