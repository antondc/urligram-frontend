import { Dispatch } from 'redux';

import { voteBookmarkReceive } from 'Modules/Bookmarks/actions/voteBookmarkReceive';
import { voteBookmarkRequest } from 'Modules/Bookmarks/actions/voteBookmarkRequest';
import { ReceiveLinkResponse } from 'Modules/Links/links.types';
import HttpClient from 'Services/HttpClient';
import { voteLinkReceive } from './voteLinkReceive';
import { voteLinkRequest } from './voteLinkRequest';

export const voteLink = ({ vote, linkId, userId }) => async (dispatch?: Dispatch) => {
  await dispatch(voteLinkRequest({ linkId }));
  await dispatch(voteBookmarkRequest({ linkId }));
  const { data }: ReceiveLinkResponse = await HttpClient.put(`/links/${linkId}`, {
    vote,
    userId,
  });

  await dispatch(voteLinkReceive(data?.attributes));
  await dispatch(
    voteBookmarkReceive({
      linkId: data?.attributes?.id,
      statistics: data.attributes?.statistics,
    })
  );

  return;
};
