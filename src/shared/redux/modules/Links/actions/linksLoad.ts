import { LinksActions, LinksApiResponse, LinkState } from 'Modules/Links/links.types';
import HttpClient from 'Services/HttpClient';
import { QueryStringWrapper } from 'Services/QueryStringWrapper';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
import { AppThunk } from '../../..';
import { linksLoadRequest } from './linksLoadRequest';
import { linksLoadSuccess } from './linksLoadSuccess';

export const linksLoad = (size?: number): AppThunk<Promise<LinkState[]>, LinksActions> => async (
  dispatch,
  getState
): Promise<LinkState[]> => {
  try {
    const { Links: linksState } = getState();
    const linksActiveSort = linksState?.meta?.sort;

    dispatch(
      linksLoadRequest({
        ...linksState,
        loading: true,
        meta: {
          ...linksState.meta,
          sort: undefined,
        },
      })
    );

    const queryStringUpdated = QueryStringWrapper.addSearchParamsNoReplace(window.location.search, {
      page: { size },
      sort: linksActiveSort,
    });

    const {
      meta: { totalItems, sort },
      data,
    } = await HttpClient.get<void, LinksApiResponse>(`/links?${queryStringUpdated}`);

    const linksArray = data.map((item) => item.attributes);

    const payload = {
      byKey: {
        ...linksState.byKey,
        ...serializerFromArrayToByKey<LinkState, LinkState>({
          data: linksArray,
        }),
      },
      allIds: data.map((item) => item.id),
      meta: {
        ...linksState.meta,
        totalItems,
        sort,
      },
      loading: false,
    };
    dispatch(linksLoadSuccess(payload));

    return linksArray;
  } catch (err) {
    throw new Error(err);
  }
};
