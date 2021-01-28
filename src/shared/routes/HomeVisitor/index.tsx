import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadBookmarks } from 'Modules/Bookmarks/actions/loadBookmarks';
import { selectBookmarksAll } from 'Modules/Bookmarks/selectors/selectBookmarksAll';
import { ListState } from 'Modules/Lists/lists.types';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { selectPopularListsLoading } from '../../redux/modules/Sections/selectors/selectPopularListsLoading';
import { HomeVisitor as HomeVisitorUI } from './HomeVisitor';

interface Props {
  mostFollowedLists: ListState[];
  mostFollowedListsLoading: boolean;
}

class HomeVisitor extends React.Component<Props> {
  render = () => {
    const { mostFollowedLists, mostFollowedListsLoading } = this.props;

    return <HomeVisitorUI mostFollowedLists={mostFollowedLists} mostFollowedListsLoading={mostFollowedListsLoading} />;
  };
}

const mapStateToProps = createStructuredSelector({
  bookmarks: selectBookmarksAll,
  mostFollowedLists: selectPopularLists,
  mostFollowedListsLoading: selectPopularListsLoading,
});

export default connect(mapStateToProps, {
  loadBookmarks,
})(HomeVisitor);
