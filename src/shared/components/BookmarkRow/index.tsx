import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { linkVote } from 'Modules/Links/actions/linkVote';
import { selectSessionUserId } from 'Root/src/shared/redux/modules/Session/selectors/selectSessionUserId';
import { BookmarkRow as BookmarkRowUi } from './BookmarkRow';

import './BookmarkRow.less';

interface Props extends BookmarkState {
  linkVote: ({ vote: boolean, linkId: number, userId: string }) => void;
  userId: string;
}

const BookmarkRow: React.FC<Props> = (props) => {
  const onVote = (vote) => {
    props.linkVote({ vote, linkId: props.linkId, userId: props.userId });
  };

  return <BookmarkRowUi {...props} onVote={onVote} />;
};

const mapStateToProps = createStructuredSelector({
  userId: selectSessionUserId,
});

export default connect(mapStateToProps, { linkVote })(BookmarkRow);
