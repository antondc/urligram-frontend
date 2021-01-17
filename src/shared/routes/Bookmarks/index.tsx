import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadBookmarks } from 'Modules/Bookmarks/actions/loadBookmarks';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { selectBookmarksAll } from 'Modules/Bookmarks/selectors/selectBookmarksAll';
import { selectBookmarksAllIds } from 'Modules/Bookmarks/selectors/selectBookmarksAllIds';
import { ListState } from 'Modules/Lists/lists.types';
import { loadPopularLists } from 'Modules/Sections/actions/loadPopularLists';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { BookmarksUi } from './bookmarksUi';

interface Props {
  bookmarks: BookmarkState[];
  bookmarksIds: number[];
  popularLists: ListState[];
  loadBookmarks: () => void;
  loadPopularLists: () => void;
}

class Home extends React.Component<Props> {
  componentDidMount = () => {
    this.props.loadBookmarks();
    this.props.loadPopularLists();
  };

  render = () => {
    const { bookmarksIds, popularLists } = this.props;

    return <BookmarksUi bookmarksIds={bookmarksIds} popularLists={popularLists} />;
  };
}

const mapStateToProps = createStructuredSelector({
  bookmarks: selectBookmarksAll,
  popularLists: selectPopularLists,
  bookmarksIds: selectBookmarksAllIds,
});

export default connect(mapStateToProps, {
  loadBookmarks,
  loadPopularLists,
})(Home);
