import { LINK_VOTE_REQUEST, LinksActions, LinksState } from 'Modules/Links/links.types';

export const linkUpdateVoteRequest = (payload: LinksState): LinksActions => ({
  type: LINK_VOTE_REQUEST,
  payload,
});
