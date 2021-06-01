import { bookmarkUpdateVoteRequest } from 'Modules/Bookmarks/actions/bookmarkUpdateVoteRequest';
import { bookmarkUpdateVoteSuccess } from 'Modules/Bookmarks/actions/bookmarkUpdateVoteSuccess';
import { BookmarksActions } from 'Modules/Bookmarks/bookmarks.types';
import { LinkApiResponse, LinksActions, LinkState } from 'Modules/Links/links.types';
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
  const { Links: linksBeforeRequest } = getState();

  try {
    dispatch(bookmarkUpdateVoteRequest({ linkId }));

    await dispatch(
      linkUpdateVoteRequest({
        byKey: {
          ...linksBeforeRequest?.byKey,
          [linkId]: {
            ...linksBeforeRequest?.byKey[linkId],
            statistics: {
              ...linksBeforeRequest?.byKey[linkId]?.statistics,
              loading: true,
            },
          },
        },
      })
    );

    const { data } = await HttpClient.put<void, LinkApiResponse>(`/links/${linkId}`, {
      vote,
      userId,
    });
    const { Links: linksAfterResponse } = getState();

    dispatch(
      linkUpdateVoteSuccess({
        ...linksAfterResponse,
        byKey: {
          ...linksAfterResponse.byKey,
          [data.attributes.id]: {
            ...data.attributes,
          },
        },
      })
    );

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
  } catch (error) {
    throw error;
  }
};
