import { Dispatch } from 'redux';

import { voteBookmarkReceive } from 'Modules/Bookmarks/actions/voteBookmarkReceive';
import { voteBookmarkRequest } from 'Modules/Bookmarks/actions/voteBookmarkRequest';
import { BookmarksState, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { LinksState, ReceiveLinkResponse } from 'Modules/Links/links.types';
import HttpClient from 'Services/HttpClient';
import { serializerFromArrayToByKey } from 'Tools/utils/serializers/serializerFromArrayToByKey';
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

  const bookmarksWithLinkIdArray = Object.values(Bookmarks?.byKey).filter((item) => item?.linkId === linkId) || [];
  const bookmarksWithLinkIdArrayStarted = bookmarksWithLinkIdArray.map((item) => ({
    ...item,
    statistics: {
      ...item.statistics,
      loading: true,
    },
  }));
  const voteLinkBookmarksByKeyStarted = serializerFromArrayToByKey<BookmarkState>(bookmarksWithLinkIdArrayStarted);

  const voteLinkBookmarksStartedState = {
    ...Bookmarks,
    byKey: {
      ...Bookmarks.byKey,
      ...voteLinkBookmarksByKeyStarted,
    },
  };
  await dispatch(voteBookmarkRequest(voteLinkBookmarksStartedState));

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

  const linksSerializedByKeyResponse = {
    byKey: {
      ...byKey,
      [data.attributes.id]: {
        ...data.attributes,
      },
    },
  };

  await dispatch(voteLinkReceive(linksSerializedByKeyResponse));

  const bookmarksWithLinkIdArraySuccess = bookmarksWithLinkIdArray.map((item) => ({
    ...item,
    statistics: {
      ...data?.attributes?.statistics,
      loading: false,
    },
  }));
  const voteLinkBookmarksByKeySuccess = serializerFromArrayToByKey<BookmarkState>(bookmarksWithLinkIdArraySuccess);

  const voteLinkBookmarksSuccess = {
    ...Bookmarks,
    byKey: {
      ...Bookmarks.byKey,
      ...voteLinkBookmarksByKeySuccess,
    },
  };

  await dispatch(voteBookmarkReceive(voteLinkBookmarksSuccess));

  return;
};
