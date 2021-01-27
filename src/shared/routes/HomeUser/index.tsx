import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadBookmarks } from 'Modules/Bookmarks/actions/loadBookmarks';
import { selectBookmarksAll } from 'Modules/Bookmarks/selectors/selectBookmarksAll';
import { ListState } from 'Modules/Lists/lists.types';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { HomeUser as HomeUserUI } from './HomeUser';

interface Props {
  popularLists: ListState[];
}

class HomeUser extends React.Component<Props> {
  render = () => {
    const { popularLists } = this.props;

    return <HomeUserUI popularLists={popularLists} />;
  };
}

const mapStateToProps = createStructuredSelector({
  bookmarks: selectBookmarksAll,
  popularLists: selectPopularLists,
});

export default connect(mapStateToProps, {
  loadBookmarks,
})(HomeUser);
