import { Dispatch } from 'redux';

import { ReceiveMostPopularListsResponse } from 'Modules/Sections/sections.types';
import HttpClient from 'Root/src/shared/services/HttpClient';
import { receivePopularLists } from './receivePopularLists';
import { requestPopularLists } from './requestPopularLists';

const serializerByKey = (data) => data.reduce((acc, curr) => ({ ...acc, ...{ [curr.id]: curr.attributes } }), {});

export const loadPopularLists = () => async (dispatch?: Dispatch) => {
  if (isBrowser) {
    const response = await HttpClient.get<ReceiveMostPopularListsResponse>('/lists');

    const popularListsByKey = {
      byKey: serializerByKey(response.data),
    };
    dispatch(requestPopularLists());
    dispatch(receivePopularLists({ PopularLists: popularListsByKey }));

    return;
  }

  const response = await HttpClient.get<ReceiveMostPopularListsResponse>('/lists');
  const popularListsByKey = {
    byKey: serializerByKey(response.data),
  };

  const result = {
    Sections: {
      PopularLists: popularListsByKey,
    },
  };

  return result;
};
