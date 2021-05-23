import { LINK_LOAD_BY_ID_SUCCESS, LinksActions, LinksState } from 'Modules/Links/links.types';

export const linkLoadByIdSuccess = (payload: LinksState): LinksActions => ({
  type: LINK_LOAD_BY_ID_SUCCESS,
  payload,
});
