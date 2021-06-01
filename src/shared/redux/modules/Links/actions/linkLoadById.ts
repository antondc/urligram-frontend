import { LinkApiResponse, LinksActions, LinkState } from 'Modules/Links/links.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { linkLoadByIdFailure } from './linkLoadByIdFailure';
import { linkLoadByIdRequest } from './linkLoadByIdRequest';
import { linkLoadByIdSuccess } from './linkLoadByIdSuccess';

export const linkLoadById = (linkId: number): AppThunk<Promise<LinkState>, LinksActions> => async (
  dispatch,
  getState
): Promise<LinkState> => {
  const { Links: linksBeforeRequest } = getState();
  try {
    dispatch(
      linkLoadByIdRequest({
        ...linksBeforeRequest,
        byKey: {
          ...linksBeforeRequest.byKey,
          [linkId]: {
            ...linksBeforeRequest.byKey[linkId],
            loading: true,
          },
        },
      })
    );

    const { data } = await HttpClient.get<void, LinkApiResponse>(`/links/${linkId}`);
    const { Links: linksAfterResponse } = getState();

    dispatch(
      linkLoadByIdSuccess({
        ...linksAfterResponse,
        byKey: {
          ...linksAfterResponse.byKey,
          [linkId]: {
            ...data.attributes,
            loading: false,
          },
        },
      })
    );

    return data?.attributes;
  } catch (error) {
    const { Links: linksOnError } = getState();

    await dispatch(
      linkLoadByIdFailure({
        ...linksOnError,
        errors: [...(linksOnError.errors || []), error],
      })
    );

    throw error;
  }
};
