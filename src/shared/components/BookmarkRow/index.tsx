import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { linkUpdateVote } from 'Modules/Links/actions/linkUpdateVote';
import { RootState } from 'Modules/rootType';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
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
  const session = useSelector(selectSession);
  const [listsShown, setListsShown] = useState<boolean>(false);
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
    userId,
  } = useSelector((state: RootState) => selectBookmarksById(state, { bookmarkId: id }));
  const timePassed = unixTimeElapsed(createdAt);
  const recentlyCreated = timePassed < TIME_RECENTLY_CREATED_BOOKMARK;
  const isOwnBookmark = userId === session?.id;
  const onVote = (vote) => {
    if (!isLogged) return dispatch(switchLoginModal(true));

    dispatch(linkUpdateVote({ vote, linkId, userId: session?.id }));
  };

  if (!id) return null;

  const onListsClick = () => {
    setListsShown(!listsShown);
  };

  const onListLeave = () => {
    setListsShown(false);
  };

  return (
    <BookmarkRowUi
      id={id}
      userId={session?.id}
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
      onListsClick={onListsClick}
      isOwnBookmark={isOwnBookmark}
      listsShown={listsShown}
      onListLeave={onListLeave}
    />
  );
};

export default BookmarkRow;
