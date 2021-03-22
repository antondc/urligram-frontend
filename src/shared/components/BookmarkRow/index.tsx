import React from 'react';
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
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { BookmarkRow as BookmarkRowUi } from './BookmarkRow';

import './BookmarkRow.less';

interface Props {
  id: number;
}

const BookmarkRow: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const isLogged = useSelector(selectSessionLoggedIn);
  const sessionId = useSelector(selectSessionUserId);
  const bookmark = useSelector((state: RootState) => selectBookmarksById(state, { id }));
  const { linkId, title, url, tags = [], img, statistics, favicon, createdAt, bookmarkingLoading, users } = bookmark;
  const date = new LocaleFormattedDate(createdAt, currentLanguageSlug);
  const formattedDate = date.getLocaleFormattedDate();
  const userBookmarked = users.includes(sessionId);
  const tagsByName = tags.map((item) => ({ tag: item.name }));

  const onVote = (vote) => {
    if (!isLogged) return dispatch(switchLoginModal(false));

    dispatch(voteLink({ vote, linkId, userId: sessionId }));
  };

  const onBookmark = () => {
    if (!userBookmarked) {
      dispatch(bookmarkCreate({ title, url, isPrivate: false, tags: tagsByName, bookmarkId: id }));
    } else {
      //
    }
  };

  const onEdit = () => {
    if (userBookmarked) {
      dispatch(switchBookmarkUpdateModal({ mount: true, bookmarkId: id }));
    } else {
      //
    }
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
    />
  );
};

export default BookmarkRow;
