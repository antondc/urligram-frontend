import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkCreate } from 'Modules/Bookmarks/actions/bookmarkCreate';
import { bookmarkUpdate } from 'Modules/Bookmarks/actions/bookmarkUpdate';
import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { linkUpdateVote } from 'Modules/Links/actions/linkUpdateVote';
import { RootState } from 'Modules/rootType';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchBookmarkUpdateModal } from 'Modules/Ui/actions/switchBookmarkUpdateModal';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { diffClientTimeAgainstUTC } from 'Tools/utils/Date/diffClientTimeAgainstUTC';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import {
  REQUEST_FAILED,
  REQUEST_STARTED,
  REQUEST_SUCCEEDED,
  ResponseStatus,
  TIME_RECENTLY_CREATED_BOOKMARK,
} from '../../constants';
import { bookmarkDelete } from '../../redux/modules/Bookmarks/actions/bookmarkDelete';
import { BookmarkRow as BookmarkRowUi } from './BookmarkRow';

import './BookmarkRow.less';

interface Props {
  id: number;
  loadMainContent: () => void;
}

const BookmarkRow: React.FC<Props> = ({ id, loadMainContent }) => {
  const dispatch = useDispatch();
  const isLogged = useSelector(selectSessionLoggedIn);
  const sessionId = useSelector(selectSessionUserId);
  const {
    linkId,
    order,
    userId,
    title,
    url,
    tags = [],
    img,
    statistics,
    favicon,
    createdAt,
    users,
    isPrivate,
  } = useSelector((state: RootState) => selectBookmarksById(state, { id }));
  const isOwnBookmark = sessionId === userId;

  const [bookmarkingLoading, setBookmarkingLoading] = useState<boolean>(false);
  const [isBookmarkDeletePending, setIsBookmarkDeletePending] = useState<boolean>(false);
  const timePassed = diffClientTimeAgainstUTC(createdAt);
  const recentlyCreated = timePassed < TIME_RECENTLY_CREATED_BOOKMARK;
  const [recentlyCreatedState, setRecentlyCreatedState] = useState(recentlyCreated);
  const [isPrivateRequestStatus, setPrivateRequestStatus] = useState<ResponseStatus>(undefined);
  const isPrivateRequestFailed = isPrivateRequestStatus === REQUEST_FAILED;
  const isPrivateRequestPending = isPrivateRequestStatus === REQUEST_STARTED;
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const date = new LocaleFormattedDate(createdAt, currentLanguageSlug);
  const formattedDate = date.getLocaleFormattedDate();
  const userBookmarkedLink = users?.includes(sessionId);
  const tagsByName = tags?.map((item) => ({ tag: item.name }));

  const onVote = (vote) => {
    if (!isLogged) return dispatch(switchLoginModal(true));

    dispatch(linkUpdateVote({ vote, linkId, userId: sessionId }));
  };

  const onBookmarkGrab = async () => {
    if (!isLogged) return dispatch(switchLoginModal(true));
    if (userBookmarkedLink) return;

    setBookmarkingLoading(true);
    const result = await dispatch(bookmarkCreate({ title, url, isPrivate: false, tags: tagsByName }));
    setBookmarkingLoading(false);
    if (result?.id) setRecentlyCreatedState(true);
  };

  const onBookmarkDelete = async () => {
    if (!isLogged) return dispatch(switchLoginModal(true));
    if (!userBookmarkedLink) return;

    setIsBookmarkDeletePending(true);
    await dispatch(bookmarkDelete(id));
    setIsBookmarkDeletePending(false);
  };

  const onPrivateSwitch = async () => {
    if (!isLogged) return dispatch(switchLoginModal(true));
    if (!userBookmarkedLink) return;

    setPrivateRequestStatus(REQUEST_STARTED);

    const data = {
      bookmarkId: id,
      title: title,
      isPrivate: !isPrivate,
      order: order,
      tags: tagsByName,
    };

    const response = await dispatch(bookmarkUpdate(data));

    if (!response.id) {
      setPrivateRequestStatus(REQUEST_FAILED);

      return;
    }

    setPrivateRequestStatus(REQUEST_SUCCEEDED);
  };

  const onEdit = async () => {
    if (!isLogged) return dispatch(switchLoginModal(true));
    if (!userBookmarkedLink) return;

    await dispatch(switchBookmarkUpdateModal({ mounted: true, bookmarkId: id }));
    loadMainContent();
  };

  const onMouseLeave = () => {
    setRecentlyCreatedState(false);
  };

  if (!id) return null;

  return (
    <BookmarkRowUi
      id={id}
      userId={sessionId}
      isOwnBookmark={isOwnBookmark}
      linkId={linkId}
      title={title}
      url={url}
      createdAt={formattedDate}
      tags={tags}
      favicon={favicon}
      img={img}
      isPrivate={isPrivate}
      isPrivateRequestFailed={isPrivateRequestFailed}
      isPrivateRequestPending={isPrivateRequestPending}
      statistics={statistics}
      isBookmarkDeletePending={isBookmarkDeletePending}
      bookmarkingLoading={bookmarkingLoading}
      userBookmarkedLink={userBookmarkedLink}
      onEdit={onEdit}
      onVote={onVote}
      onBookmarkGrab={onBookmarkGrab}
      onBookmarkDelete={onBookmarkDelete}
      onPrivateSwitch={onPrivateSwitch}
      onMouseLeave={onMouseLeave}
      recentlyCreated={recentlyCreatedState}
    />
  );
};

export default BookmarkRow;
