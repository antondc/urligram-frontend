import { LINKS_LOAD_REQUEST, LinksActionsTypes, LinksState } from 'Modules/Links/links.types';

export const linksLoadRequest = (payload: LinksState): LinksActionsTypes => ({
  type: LINKS_LOAD_REQUEST,
  payload,
});
