import { Dispatch } from 'redux';
import { ReceiveLinksResponse } from 'Modules/Links/links.types';
import { requestLinks } from './requestLinks';
import { receiveLinks } from './receiveLinks';
import links from 'Modules/Links/links.data.json';

export const loadLinks = () => {
  if (isBrowser) {
    return (dispatch: Dispatch) => {
      const response: ReceiveLinksResponse = links;

      dispatch(requestLinks());
      dispatch(receiveLinks(response.data.Links));
    };
  }

  const response: ReceiveLinksResponse = links;

  return response.data;
};
