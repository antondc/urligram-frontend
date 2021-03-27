import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkCreate } from 'Modules/Bookmarks/actions/bookmarkCreate';
import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { voteLink } from 'Modules/Links/actions/voteLink';
import { RootState } from 'Modules/rootType';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchBookmarkUpdateModal } from 'Modules/Ui/actions/switchBookmarkUpdateModal';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { getDiffLocalTimeUTCSeconds } from 'Tools/utils/Date/getDiffLocalTimeUTCSeconds';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { TIME_RECENTLY_CREATED_BOOKMARK } from '../../constants';
import { BookmarkRow as BookmarkRowUi } from './BookmarkRow';

import './BookmarkRow.less';

interface Props {
  id: number;
}

const BookmarkRow: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const bookmark = useSelector((state: RootState) => selectBookmarksById(state, { id }));
  const { linkId, title, url, tags = [], img, statistics, favicon, createdAt, users } = bookmark;
  const [bookmarkingLoading, setBookmarkingLoading] = useState<boolean>(false);
  const timePassed = getDiffLocalTimeUTCSeconds(createdAt);
  const recentlyCreatedA = timePassed < TIME_RECENTLY_CREATED_BOOKMARK;
  const [recentlyCreated, setRecentlyCreated] = useState(recentlyCreatedA);
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const isLogged = useSelector(selectSessionLoggedIn);
  const sessionId = useSelector(selectSessionUserId);
  const date = new LocaleFormattedDate(createdAt, currentLanguageSlug);
  const formattedDate = date.getLocaleFormattedDate();
  const userBookmarked = users.includes(sessionId);
  const tagsByName = tags?.map((item) => ({ tag: item.name }));

  const onVote = (vote) => {
    if (!isLogged) return dispatch(switchLoginModal(false));

    dispatch(voteLink({ vote, linkId, userId: sessionId }));
  };

  const onBookmark = async () => {
    if (!userBookmarked) {
      setBookmarkingLoading(true);
      const result = await dispatch(bookmarkCreate({ title, url, isPrivate: false, tags: tagsByName }));
      if (result.id) {
        setBookmarkingLoading(false);
        setRecentlyCreated(true);
      }
    } else {
      //
    }
  };

  const onEdit = () => {
    if (userBookmarked) {
      dispatch(switchBookmarkUpdateModal({ mounted: true, bookmarkId: id }));
    } else {
      //
    }
  };

  const onMouseLeave = () => {
    setRecentlyCreated(false);
  };

  return (
    <BookmarkRowUi
      id={id}
      userId={sessionId}
      linkId={linkId}
      title={title}
      url={url}
      createdAt={formattedDate}
      tags={tags}
      favicon={favicon}
      img={img}
      statistics={statistics}
      bookmarkingLoading={bookmarkingLoading}
      userBookmarked={userBookmarked}
      onEdit={onEdit}
      onVote={onVote}
      onBookmark={onBookmark}
      onMouseLeave={onMouseLeave}
      recentlyCreated={recentlyCreated}
    />
  );
};

export default BookmarkRow;
