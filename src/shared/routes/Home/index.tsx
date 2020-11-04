import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadBookmarks } from 'Modules/Bookmarks/actions/loadBookmarks.ts';
import { BookmarkState } from '../../redux/modules/Bookmarks/bookmarks.types';
import { selectBookmarksAll } from '../../redux/modules/Bookmarks/selectors/selectBookmarksAll';
import { HomeUI } from './HomeUI';

interface Props {
  bookmarks: BookmarkState[];
  loadBookmarks: () => void;
}

class Home extends React.Component<Props> {
  componentDidMount = () => {
    this.props.loadBookmarks();
  };

  render = () => {
    const { bookmarks } = this.props;
    
    return <HomeUI bookmarks={bookmarks} />;
  };
}

const mapStateToProps = createStructuredSelector({
  bookmarks: selectBookmarksAll,
});

export default connect(mapStateToProps, {
  loadBookmarks,
})(Home);
