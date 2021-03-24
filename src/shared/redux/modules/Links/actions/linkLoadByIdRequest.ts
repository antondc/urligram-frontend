import { LINK_LOAD_BY_ID_REQUEST, LinksActionsTypes, LinksState } from 'Modules/Links/links.types';

export const linkLoadByIdRequest = (payload: LinksState): LinksActionsTypes => ({
  type: LINK_LOAD_BY_ID_REQUEST,
  payload,
});
