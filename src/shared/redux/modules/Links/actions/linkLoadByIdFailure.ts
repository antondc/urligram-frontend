import { LINK_LOAD_BY_ID_FAILURE, LinkError, LinksActionsTypes } from 'Modules/Links/links.types';

export const linkLoadByIdFailure = ({ linkId, error }: { linkId: number; error: LinkError }): LinksActionsTypes => ({
  type: LINK_LOAD_BY_ID_FAILURE,
  data: {
    linkId,
    error,
  },
});
