import { LINK_VOTE_SUCCESS, LinksActions, LinksState } from 'Modules/Links/links.types';

export const voteLinkSuccess = (payload: LinksState): LinksActions => ({
  type: LINK_VOTE_SUCCESS,
  payload,
});
