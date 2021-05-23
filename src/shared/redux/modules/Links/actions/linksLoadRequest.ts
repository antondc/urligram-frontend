import { LINKS_LOAD_REQUEST, LinksActions, LinksState } from 'Modules/Links/links.types';

export const linksLoadRequest = (payload: LinksState): LinksActions => ({
  type: LINKS_LOAD_REQUEST,
  payload,
});
