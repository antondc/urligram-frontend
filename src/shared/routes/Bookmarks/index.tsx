import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadBookmarks } from 'Modules/Bookmarks/actions/loadBookmarks.ts';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { selectBookmarksAll } from 'Modules/Bookmarks/selectors/selectBookmarksAll';
import { loadPopularLists } from 'Modules/Sections/actions/loadPopularLists.ts';
import { BookmarksUi } from './bookmarksUi';

interface Props {
  bookmarks: BookmarkState[];
  loadBookmarks: () => void;
  loadPopularLists: () => void;
}

class Home extends React.Component<Props> {
  componentDidMount = () => {
    this.props.loadBookmarks();
    this.props.loadPopularLists();
  };

  render = () => {
    const { bookmarks } = this.props;

    return <BookmarksUi bookmarks={bookmarks} />;
  };
}

const mapStateToProps = createStructuredSelector({
  bookmarks: selectBookmarksAll,
});

export default connect(mapStateToProps, {
  loadBookmarks,
  loadPopularLists,
})(Home);
