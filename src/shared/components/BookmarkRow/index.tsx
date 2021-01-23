import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { voteLink } from 'Modules/Links/actions/voteLink';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { selectBookmarksLoading } from '../../redux/modules/Bookmarks/selectors/selectBookmarksLoading';
import { BookmarkRow as BookmarkRowUi } from './BookmarkRow';
import { BookmarkRowSkeleton } from './BookmarkRowSkeleton';

import './BookmarkRow.less';

interface Props {
  id: number;
  bookmark: BookmarkState;
  voteLink: ({ vote: boolean, linkId: number, userId: string }) => void;
  userId: string;
  isLogged: boolean;
  loading: boolean;
  switchLoginModal: () => void;
}

const BookmarkRow: React.FC<Props> = ({
  id,
  bookmark: { linkId, title, url, tags = [], img, statistics },
  voteLink,
  isLogged,
  userId,
  switchLoginModal,
  loading,
}) => {
  const onVote = (vote) => {
    if (!isLogged) return switchLoginModal();

    voteLink({ vote, linkId, userId });
  };

  return loading ? (
    <BookmarkRowSkeleton id={id} />
  ) : (
    <BookmarkRowUi
      id={id}
      linkId={linkId}
      title={title}
      url={url}
      tags={tags}
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
  loading: selectBookmarksLoading,
});

export default connect(mapStateToProps, {
  voteLink,
  switchLoginModal,
})(BookmarkRow);
