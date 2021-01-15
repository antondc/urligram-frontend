import { LINK_VOTE_STARTED, LinksActionsTypes, LinksState } from 'Modules/Links/links.types';

export const voteLinkRequest = (payload: LinksState): LinksActionsTypes => ({
  type: LINK_VOTE_STARTED,
  payload,
});
