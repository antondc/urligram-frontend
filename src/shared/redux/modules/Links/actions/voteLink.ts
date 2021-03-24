import { Dispatch } from 'redux';

import { voteBookmarkReceive } from 'Modules/Bookmarks/actions/voteBookmarkReceive';
import { voteBookmarkRequest } from 'Modules/Bookmarks/actions/voteBookmarkRequest';
import { LinkApiResponse, LinksActionsTypes, LinksState, LinkState } from 'Modules/Links/links.types';
import { RootState } from 'Modules/rootType';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { BookmarksActions } from '../../Bookmarks/bookmarks.types';
import { voteLinkRequest } from './voteLinkRequest';
import { voteLinkSuccess } from './voteLinkSuccess';

interface Props {
  vote: number;
  linkId: number;
  userId: string;
}

export const voteLink = ({ vote, linkId, userId }: Props): AppThunk<Promise<LinkState>> => async (
  dispatch: Dispatch<LinksActionsTypes | BookmarksActions>,
  getState: () => RootState
): Promise<LinkState> => {
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

    const { data } = await HttpClient.put<void, LinkApiResponse>(`/links/${linkId}`, {
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
    dispatch(voteLinkSuccess(linksSerializedByKeyResponse));

    dispatch(
      voteBookmarkReceive({
        linkId,
        statistics: data?.attributes?.statistics,
      })
    );

    return data.attributes;
  } catch (err) {
    throw new Error(err);
  }
};
