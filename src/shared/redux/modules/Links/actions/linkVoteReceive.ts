import { LINK_VOTE_SUCCESS } from 'Modules/Links/links.types';

export const linkVoteReceive = (data) => ({
  type: LINK_VOTE_SUCCESS,
  data: {
    ...data,
  },
});
