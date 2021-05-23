import { LINKS_LOAD_SUCCESS, LinksActions, LinksState } from 'Modules/Links/links.types';

export const linksLoadSuccess = (payload: LinksState): LinksActions => ({
  type: LINKS_LOAD_SUCCESS,
  payload,
});
