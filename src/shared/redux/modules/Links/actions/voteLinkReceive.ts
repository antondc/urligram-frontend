import { LinksActionsTypes, LinksState, VOTE_LINK_SUCCESS } from 'Modules/Links/links.types';

export const voteLinkReceive = (payload: LinksState): LinksActionsTypes => ({
  type: VOTE_LINK_SUCCESS,
  payload,
});
