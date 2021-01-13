import { LINK_VOTE_STARTED } from 'Modules/Links/links.types';

export const linkVoteRequest = () => ({
  type: LINK_VOTE_STARTED,
  data: {
    loading: true,
  },
});
