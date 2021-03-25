import { LINK_VOTE_REQUEST, LinksActions, LinksState } from 'Modules/Links/links.types';

export const voteLinkRequest = (payload: LinksState): LinksActions => ({
  type: LINK_VOTE_REQUEST,
  payload,
});
