import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkCreate } from 'Modules/Bookmarks/actions/bookmarkCreate';
import { bookmarkDelete } from 'Modules/Bookmarks/actions/bookmarkDelete';
import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { linkUpdateVote } from 'Modules/Links/actions/linkUpdateVote';
import { RootState } from 'Modules/rootType';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchBookmarkUpdateModal } from 'Modules/Ui/actions/switchBookmarkUpdateModal';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { unixTimeElapsed } from 'Tools/utils/Date/unixTimeElapsed';
import { TIME_RECENTLY_CREATED_BOOKMARK } from '../../constants';
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
  const timePassed = unixTimeElapsed(createdAt);
  const recentlyCreated = timePassed < TIME_RECENTLY_CREATED_BOOKMARK;
  const [recentlyCreatedState, setRecentlyCreatedState] = useState(recentlyCreated);
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
      tags={tags}
      favicon={favicon}
      img={img}
      isPrivate={isPrivate}
      statistics={statistics}
      isBookmarkDeletePending={isBookmarkDeletePending}
      bookmarkingLoading={bookmarkingLoading}
      userBookmarkedLink={userBookmarkedLink}
      onEdit={onEdit}
      onVote={onVote}
      onBookmarkGrab={onBookmarkGrab}
      onBookmarkDelete={onBookmarkDelete}
      onMouseLeave={onMouseLeave}
      recentlyCreated={recentlyCreatedState}
    />
  );
};

export default BookmarkRow;
