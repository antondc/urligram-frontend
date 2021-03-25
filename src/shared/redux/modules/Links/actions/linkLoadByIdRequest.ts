import { LINK_LOAD_BY_ID_REQUEST, LinksActions, LinksState } from 'Modules/Links/links.types';

export const linkLoadByIdRequest = (payload: LinksState): LinksActions => ({
  type: LINK_LOAD_BY_ID_REQUEST,
  payload,
});
