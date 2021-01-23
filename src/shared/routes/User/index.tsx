import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { loadBookmarksByUserId } from 'Modules/Bookmarks/actions/loadBookmarksByUserId';
import { ListState } from 'Modules/Lists/lists.types';
import { userLoad } from 'Modules/Users/actions/userLoad';
import { selectCurrentRouteParamUserId } from '../../redux/modules/Routes/selectors/selectCurrentRouteParamUserId';
import { selectUserBookmarkIds } from '../../redux/modules/Users/selectors/selectUserBookmarkIds';
import { User as UserUi } from './User';

interface RouteInfo {
  userId: string;
}

interface Props extends RouteComponentProps<RouteInfo> {
  bookmarksIds: number[];
  popularLists: ListState[];
  loading: boolean;
  userId: string;
  userLoad: (userId: string) => void;
  loadBookmarksByUserId: (userId: string) => void;
}

class User extends React.Component<Props> {
  componentDidMount = () => {
    const { userId } = this.props;

    this.props.userLoad(userId);
    this.props.loadBookmarksByUserId(userId);
  };

  render = () => {
    const { bookmarksIds, popularLists, loading } = this.props;

    return <UserUi bookmarksIds={bookmarksIds} popularLists={popularLists} loading={loading} />;
  };
}

const mapStateToProps = createStructuredSelector({
  userId: selectCurrentRouteParamUserId,
  bookmarksIds: selectUserBookmarkIds,
});

export default connect(mapStateToProps, {
  userLoad,
  loadBookmarksByUserId,
})(User);
