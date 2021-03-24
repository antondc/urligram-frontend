import { LINK_LOAD_BY_ID_FAILURE, LinksActionsTypes, LinksState } from 'Modules/Links/links.types';

export const linkLoadByIdFailure = (payload: LinksState): LinksActionsTypes => ({
  type: LINK_LOAD_BY_ID_FAILURE,
  payload,
});
