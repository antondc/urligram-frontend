import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import {
  LINK_LOAD_BY_ID_FAILURE,
  LINK_LOAD_BY_ID_REQUEST,
  LINK_LOAD_BY_ID_SUCCESS,
  LinkGetApiResponse,
  LinksActions,
  LinkState,
} from '../links.types';

export const linkLoadById =
  (linkId: number): AppThunk<Promise<LinkState>, LinksActions> =>
  async (dispatch, getState): Promise<LinkState> => {
    if (!linkId) return;

    const { Links: LinksBeforeRequest } = getState();

    try {
      dispatch({
        type: LINK_LOAD_BY_ID_REQUEST,
        payload: LinksBeforeRequest,
      });

      const { data: linkData } = await HttpClient.get<void, LinkGetApiResponse>(
        '/links/' + linkId + window.location.search
      );

      const { Links: LinksAfterResponse } = getState();
      dispatch({
        type: LINK_LOAD_BY_ID_SUCCESS,
        payload: {
          ...LinksAfterResponse,
          byKey: {
            ...LinksAfterResponse?.byKey,
            [linkData?.id]: {
              ...LinksAfterResponse?.byKey[linkData?.id],
              ...linkData?.attributes,
            },
          },
        },
      });

      return linkData.attributes;
    } catch (error) {
      const { Links: LinksOnError } = getState();

      dispatch({
        type: LINK_LOAD_BY_ID_FAILURE,
        payload: {
          ...LinksOnError,
          loading: false,
          errors: [...(LinksOnError?.errors || []), error],
        },
      });

      throw error;
    }
  };
