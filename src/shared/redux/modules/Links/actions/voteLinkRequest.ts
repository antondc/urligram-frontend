import { LINK_VOTE_STARTED } from 'Modules/Links/links.types';

export const voteLinkRequest = ({ linkId }) => ({
  type: LINK_VOTE_STARTED,
  data: {
    linkId,
    loading: true,
  },
});
