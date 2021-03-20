import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { voteBookmarkReceive } from 'Modules/Bookmarks/actions/voteBookmarkReceive';
import { voteBookmarkRequest } from 'Modules/Bookmarks/actions/voteBookmarkRequest';
import { LinksState, ReceiveLinkResponse } from 'Modules/Links/links.types';
import { RootState } from 'Modules/rootType';
import HttpClient from 'Services/HttpClient';
import { voteLinkReceive } from './voteLinkReceive';
import { voteLinkRequest } from './voteLinkRequest';

interface Props {
  vote: number;
  linkId: number;
  userId: string;
}

export const voteLink = ({ vote, linkId, userId }: Props): ThunkAction<any, any, any, Action> => async (
  dispatch: ThunkDispatch<any, void, Action>,
  getState: () => RootState
) => {
  const {
    Links: { byKey },
  } = getState();

  try {
    dispatch(voteBookmarkRequest({ linkId }));

    const linksSerializedByKeyRequest: LinksState = {
      byKey: {
        ...byKey,
        [linkId]: {
          ...byKey[linkId],
          statistics: {
            ...byKey[linkId]?.statistics,
            loading: true,
          },
        },
      },
    };

    await dispatch(voteLinkRequest(linksSerializedByKeyRequest));

    const { data }: ReceiveLinkResponse = await HttpClient.put(`/links/${linkId}`, {
      vote,
      userId,
    });

    const linksSerializedByKeyResponse: LinksState = {
      byKey: {
        ...byKey,
        [data.attributes.id]: {
          ...data.attributes,
        },
      },
    };

    dispatch(voteLinkReceive(linksSerializedByKeyResponse));
    dispatch(
      voteBookmarkReceive({
        linkId,
        statistics: data?.attributes?.statistics,
      })
    );
  } catch (err) {
    throw new Error(err);
  }

  return;
};
