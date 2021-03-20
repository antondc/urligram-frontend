import { LINK_LOAD_BY_ID_REQUEST, LinksActionsTypes } from 'Modules/Links/links.types';

export const linkLoadByIdRequest = (linkId: number): LinksActionsTypes => ({
  type: LINK_LOAD_BY_ID_REQUEST,
  data: {
    linkId,
  },
});
