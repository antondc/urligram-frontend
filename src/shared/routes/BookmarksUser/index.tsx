import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadBookmarks } from 'Modules/Bookmarks/actions/loadBookmarks';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { selectBookmarksAll } from 'Modules/Bookmarks/selectors/selectBookmarksAll';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { ListState } from 'Modules/Lists/lists.types';
import { loadPopularLists } from 'Modules/Sections/actions/loadPopularLists';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { selectBookmarksLoading } from '../../redux/modules/Bookmarks/selectors/selectBookmarksLoading';
import { BookmarksUser as BookmarksUserUi } from './BookmarksUser';

interface Props {
  bookmarks: BookmarkState[];
  bookmarksIds: number[];
  popularLists: ListState[];
  loading: true;
  loadBookmarks: () => void;
  loadPopularLists: () => void;
}

class Home extends React.Component<Props> {
  componentDidMount = () => {
    this.props.loadBookmarks();
    this.props.loadPopularLists();
  };

  render = () => {
    const { bookmarksIds, popularLists, loading } = this.props;

    return <BookmarksUserUi bookmarksIds={bookmarksIds} popularLists={popularLists} loading={loading} />;
  };
}

const mapStateToProps = createStructuredSelector({
  bookmarks: selectBookmarksAll,
  popularLists: selectPopularLists,
  bookmarksIds: selectBookmarksCurrentIds,
  loading: selectBookmarksLoading,
});

export default connect(mapStateToProps, {
  loadBookmarks,
  loadPopularLists,
})(Home);
