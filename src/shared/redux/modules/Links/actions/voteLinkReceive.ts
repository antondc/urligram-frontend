import { VOTE_LINK_SUCCESS } from 'Modules/Links/links.types';

export const voteLinkReceive = (data) => ({
  type: VOTE_LINK_SUCCESS,
  data: {
    ...data,
  },
});
