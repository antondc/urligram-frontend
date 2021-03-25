import { LINK_LOAD_BY_ID_FAILURE, LinksActions, LinksState } from 'Modules/Links/links.types';

export const linkLoadByIdFailure = (payload: LinksState): LinksActions => ({
  type: LINK_LOAD_BY_ID_FAILURE,
  payload,
});
