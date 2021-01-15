import { Dispatch } from 'redux';

import { voteBookmarkReceive } from 'Modules/Bookmarks/actions/voteBookmarkReceive';
import { voteBookmarkRequest } from 'Modules/Bookmarks/actions/voteBookmarkRequest';
import { BookmarksState, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { LinksState, ReceiveLinkResponse } from 'Modules/Links/links.types';
import HttpClient from 'Services/HttpClient';
import { voteLinkReceive } from './voteLinkReceive';
import { voteLinkRequest } from './voteLinkRequest';

export const voteLink = ({ vote, linkId, userId }) => async (dispatch: Dispatch, getState) => {
  const {
    Links: { byKey },
    Bookmarks,
  }: {
    Links: LinksState;
    Bookmarks: BookmarksState;
  } = getState();

  const bookmarksWithLinkIdArray: BookmarkState[] =
    Object.values(Bookmarks?.byKey).filter((item) => item?.linkId === linkId) || [];

  const bookmarksWithLinkIdArrayStarted: BookmarkState[] = bookmarksWithLinkIdArray.map((item) => ({
    ...item,
    statistics: {
      ...item.statistics,
      loading: true,
    },
  }));

  bookmarksWithLinkIdArrayStarted.forEach(async (item) => {
    await dispatch(voteBookmarkRequest(item));
  });

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

  await dispatch(voteLinkReceive(linksSerializedByKeyResponse));

  const bookmarksWithLinkIdArraySuccess: BookmarkState[] = bookmarksWithLinkIdArray.map((item) => ({
    ...item,
    statistics: {
      ...data?.attributes?.statistics,
      loading: false,
    },
  }));

  bookmarksWithLinkIdArraySuccess.forEach(async (item) => {
    await dispatch(voteBookmarkReceive(item));
  });

  return;
};
