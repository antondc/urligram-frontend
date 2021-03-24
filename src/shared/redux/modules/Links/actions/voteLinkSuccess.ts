import { LINK_VOTE_SUCCESS, LinksActionsTypes, LinksState } from 'Modules/Links/links.types';

export const voteLinkSuccess = (payload: LinksState): LinksActionsTypes => ({
  type: LINK_VOTE_SUCCESS,
  payload,
});
