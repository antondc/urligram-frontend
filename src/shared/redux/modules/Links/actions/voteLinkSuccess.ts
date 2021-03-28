import { LINK_VOTE_SUCCESS, LinksActions, LinksState } from 'Modules/Links/links.types';

export const linkUpdateVoteSuccess = (payload: LinksState): LinksActions => ({
  type: LINK_VOTE_SUCCESS,
  payload,
});
