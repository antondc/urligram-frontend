import { LinkApiResponse, LinksActionsTypes, LinkState } from 'Modules/Links/links.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { linkLoadByIdFailure } from './linkLoadByIdFailure';
import { linkLoadByIdRequest } from './linkLoadByIdRequest';
import { linkLoadByIdSuccess } from './linkLoadByIdSuccess';

export const linkLoadById = (linkId: number): AppThunk<Promise<LinkState>, LinksActionsTypes> => async (
  dispatch,
  getState
): Promise<LinkState> => {
  const { Links } = getState();
  try {
    dispatch(
      linkLoadByIdRequest({
        ...Links,
        byKey: {
          ...Links.byKey,
          [linkId]: {
            ...Links.byKey[linkId],
            loading: true,
          },
        },
      })
    );

    const { data } = await HttpClient.get<void, LinkApiResponse>(`/links/${linkId}`);

    dispatch(
      linkLoadByIdSuccess({
        ...Links,
        byKey: {
          ...Links.byKey,
          [linkId]: data.attributes,
        },
      })
    );

    return data?.attributes;
  } catch (error) {
    await dispatch(
      linkLoadByIdFailure({
        ...Links,
        errors: [...Links.errors, error],
      })
    );

    throw new Error(error);
  }
};
