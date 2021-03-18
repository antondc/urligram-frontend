import React from 'react';
import { connect, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { voteLink } from 'Modules/Links/actions/voteLink';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { BookmarkRow as BookmarkRowUi } from './BookmarkRow';

import './BookmarkRow.less';

interface Props {
  id: number;
  bookmark: BookmarkState;
  voteLink: ({ vote: boolean, linkId: number, userId: string }) => void;
  userId: string;
  isLogged: boolean;
  switchLoginModal: (mount: false) => void;
}

const BookmarkRow: React.FC<Props> = ({
  id,
  bookmark: { linkId, title, url, tags = [], img, statistics, favicon, createdAt } = {},
  voteLink,
  isLogged,
  userId,
  switchLoginModal,
}) => {
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const date = new LocaleFormattedDate(createdAt, currentLanguageSlug);
  const formattedDate = date.getLocaleFormattedDate();

  const onVote = (vote) => {
    if (!isLogged) return switchLoginModal(false);

    voteLink({ vote, linkId, userId });
  };

  return (
    <BookmarkRowUi
      id={id}
      userId={userId}
      linkId={linkId}
      title={title}
      url={url}
      createdAt={formattedDate}
      tags={tags}
      favicon={favicon}
      img={img}
      statistics={statistics}
      onVote={onVote}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  userId: selectSessionUserId,
  isLogged: selectSessionLoggedIn,
  bookmark: selectBookmarksById,
});

export default connect(mapStateToProps, {
  voteLink,
  switchLoginModal,
})(BookmarkRow);
