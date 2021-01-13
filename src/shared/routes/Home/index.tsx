import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadBookmarks } from 'Modules/Bookmarks/actions/loadBookmarks';
import { selectBookmarksAll } from 'Modules/Bookmarks/selectors/selectBookmarksAll';
import { HomeUI } from './HomeUI';

class Home extends React.Component {
  render = () => <HomeUI />;
}

const mapStateToProps = createStructuredSelector({
  bookmarks: selectBookmarksAll,
});

export default connect(mapStateToProps, {
  loadBookmarks,
})(Home);
