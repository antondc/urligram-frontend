import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
  const timePassed = unixTimeElapsed(createdAt);
  const recentlyCreated = timePassed < TIME_RECENTLY_CREATED_BOOKMARK;
  const [recentlyCreatedState, setRecentlyCreatedState] = useState(recentlyCreated);
  const userBookmarkedLink = users?.includes(sessionId);

  const onVote = (vote) => {
    if (!isLogged) return dispatch(switchLoginModal(true));

    dispatch(linkUpdateVote({ vote, linkId, userId: sessionId }));
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
      onEdit={onEdit}
      onVote={onVote}
      onMouseLeave={onMouseLeave}
      recentlyCreated={recentlyCreatedState}
    />
  );
};

export default BookmarkRow;
