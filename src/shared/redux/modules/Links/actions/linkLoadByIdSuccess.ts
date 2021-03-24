import { LINK_LOAD_BY_ID_SUCCESS, LinksActionsTypes, LinksState } from 'Modules/Links/links.types';

export const linkLoadByIdSuccess = (payload: LinksState): LinksActionsTypes => ({
  type: LINK_LOAD_BY_ID_SUCCESS,
  payload,
});
