import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ReceiveMostPopularListsResponse } from 'Modules/Sections/sections.types';
import HttpClient from 'Services/HttpClient';
import { receivePopularLists } from './receivePopularLists';
import { requestPopularLists } from './requestPopularLists';

const serializerByKey = (data) => data.reduce((acc, curr) => ({ ...acc, ...{ [curr.id]: curr.attributes } }), {});

export const loadPopularLists = (): ThunkAction<any, any, any, Action> => async (dispatch?: Dispatch) => {
  if (isBrowser) {
    dispatch(requestPopularLists());
    const response = await HttpClient.get<ReceiveMostPopularListsResponse>('/lists?sort=-members&page[size]=5');

    const popularListsByKey = {
      byKey: serializerByKey(response.data),
    };
    dispatch(receivePopularLists({ PopularLists: popularListsByKey }));

    return;
  }

  const response = await HttpClient.get<ReceiveMostPopularListsResponse>('/lists?sort=-members&page[size]=5');

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
