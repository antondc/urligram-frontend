import { Dispatch } from 'redux';

import { ReceiveLinkResponse } from 'Modules/Links/links.types';
import HttpClient from 'Root/src/shared/services/HttpClient';
import { bookmarkUpdateVote } from '../../Bookmarks/actions/bookmarkUpdateVote';
import { linkVoteReceive } from './linkVoteReceive';
import { linkVoteRequest } from './linkVoteRequest';

const linksSerializerByKey = (data) => data.reduce((acc, curr) => ({ ...acc, ...{ [curr.id]: curr.attributes } }), {});

export const linkVote = ({ vote, linkId, userId }) => async (dispatch?: Dispatch) => {
  const { data } = await HttpClient.put<ReceiveLinkResponse>(`/links/${linkId}`, {
    vote,
    userId,
  });

  const linksByKey = {
    byKey: linksSerializerByKey([data]),
  };

  dispatch(linkVoteRequest());
  dispatch(linkVoteReceive(linksByKey));
  // TODO: update axios response type
  // @ts-ignore
  dispatch(bookmarkUpdateVote({ linkId: data.id, vote: data.attributes.statistics.vote }));

  return;
};
