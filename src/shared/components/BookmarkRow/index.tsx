import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { linkUpdateVote } from 'Modules/Links/actions/linkUpdateVote';
import { RootState } from 'Modules/rootType';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { unixTimeElapsed } from 'Tools/utils/Date/unixTimeElapsed';
import { TIME_RECENTLY_CREATED_BOOKMARK } from '../../constants';
import { BookmarkRow as BookmarkRowUi } from './BookmarkRow';

import './BookmarkRow.less';

interface Props {
  id: number;
}

const BookmarkRow: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const isLogged = useSelector(selectSessionLoggedIn);
  const sessionId = useSelector(selectSessionUserId);
  const {
    linkId,
    title,
    url,
    tags = [],
    img,
    statistics,
    favicon,
    createdAt,
    isPrivate,
  } = useSelector((state: RootState) => selectBookmarksById(state, { bookmarkId: id }));
  const timePassed = unixTimeElapsed(createdAt);
  const recentlyCreated = timePassed < TIME_RECENTLY_CREATED_BOOKMARK;

  const onVote = (vote) => {
    if (!isLogged) return dispatch(switchLoginModal(true));

    dispatch(linkUpdateVote({ vote, linkId, userId: sessionId }));
  };

  if (!id) return null;

  return (
    <BookmarkRowUi
      id={id}
      userId={sessionId}
      linkId={linkId}
      title={title}
      url={url}
      tags={tags}
      favicon={favicon}
      img={img}
      isPrivate={isPrivate}
      statistics={statistics}
      onVote={onVote}
      recentlyCreated={recentlyCreated}
    />
  );
};

export default BookmarkRow;
