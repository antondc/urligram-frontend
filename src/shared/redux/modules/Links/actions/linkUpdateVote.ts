import { bookmarkUpdateVoteRequest } from 'Modules/Bookmarks/actions/bookmarkUpdateVoteRequest';
import { bookmarkUpdateVoteSuccess } from 'Modules/Bookmarks/actions/bookmarkUpdateVoteSuccess';
import { BookmarksActions } from 'Modules/Bookmarks/bookmarks.types';
import { LinkApiResponse, LinksActions, LinksState, LinkState } from 'Modules/Links/links.types';
import HttpClient from 'Services/HttpClient';
import { AppThunk } from '../../..';
import { linkUpdateVoteRequest } from './linkUpdateVoteRequest';
import { linkUpdateVoteSuccess } from './voteLinkSuccess';

interface Props {
  vote: number;
  linkId: number;
  userId: string;
}

export const linkUpdateVote = ({
  vote,
  linkId,
  userId,
}: Props): AppThunk<Promise<LinkState>, LinksActions | BookmarksActions> => async (
  dispatch,
  getState
): Promise<LinkState> => {
  const {
    Links: { byKey },
  } = getState();

  try {
    dispatch(bookmarkUpdateVoteRequest({ linkId }));

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
    await dispatch(linkUpdateVoteRequest(linksSerializedByKeyRequest));

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
    dispatch(linkUpdateVoteSuccess(linksSerializedByKeyResponse));

    dispatch(
      bookmarkUpdateVoteSuccess({
        linkId,
        statistics: {
          ...data?.attributes?.statistics,
          loading: false,
        },
      })
    );

    return data.attributes;
  } catch (err) {
    throw new Error(err);
  }
};
