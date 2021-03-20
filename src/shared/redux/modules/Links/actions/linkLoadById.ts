import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ReceiveLinkResponse } from 'Modules/Links/links.types';
import HttpClient from 'Services/HttpClient';
import { linkLoadByIdFailure } from './linkLoadByIdFailure';
import { linkLoadByIdRequest } from './linkLoadByIdRequest';
import { linkLoadByIdSuccess } from './linkLoadByIdSuccess';

export const linkLoadById = (linkId: number): ThunkAction<any, any, any, Action> => async (dispatch: Dispatch) => {
  try {
    dispatch(linkLoadByIdRequest(linkId));

    const { data }: ReceiveLinkResponse = await HttpClient.get(`/links/${linkId}`);
    dispatch(linkLoadByIdSuccess(data?.attributes));
  } catch (error) {
    await dispatch(linkLoadByIdFailure({ linkId, error }));

    throw new Error(error);
  }

  return;
};
