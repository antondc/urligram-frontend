import { LINK_LOAD_BY_ID_SUCCESS, LinksActionsTypes, LinkState } from 'Modules/Links/links.types';

export const linkLoadByIdSuccess = (link: LinkState): LinksActionsTypes => ({
  type: LINK_LOAD_BY_ID_SUCCESS,
  data: link,
});
