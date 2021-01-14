import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { voteLink } from 'Modules/Links/actions/voteLink';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { BookmarkRow as BookmarkRowUi } from './BookmarkRow';

import './BookmarkRow.less';

interface Props extends BookmarkState {
  voteLink: ({ vote: boolean, linkId: number, userId: string }) => void;
  userId: string;
}

const BookmarkRow: React.FC<Props> = (props) => {
  const onVote = (vote) => {
    props.voteLink({ vote, linkId: props.linkId, userId: props.userId });
  };

  return <BookmarkRowUi {...props} onVote={onVote} />;
};

const mapStateToProps = createStructuredSelector({
  userId: selectSessionUserId,
});

export default connect(mapStateToProps, { voteLink })(BookmarkRow);
