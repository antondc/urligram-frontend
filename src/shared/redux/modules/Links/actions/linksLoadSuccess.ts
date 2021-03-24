import { LINKS_LOAD_SUCCESS, LinksActionsTypes, LinksState } from 'Modules/Links/links.types';

export const linksLoadSuccess = (payload: LinksState): LinksActionsTypes => ({
  type: LINKS_LOAD_SUCCESS,
  payload,
});
