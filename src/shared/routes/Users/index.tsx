import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ListState } from 'Modules/Lists/lists.types';
import { loadPopularLists } from 'Modules/Sections/actions/loadPopularLists';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { loadUsers } from 'Modules/Users/actions/loadUsers';
import { selectUsersCurrentIds } from 'Modules/Users/selectors/selectUsersCurrentIds';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { Users as UsersUi } from './Users';

interface Props {
  usersIds: string[];
  popularLists: ListState[];
  loading: boolean;
  loadUsers: () => void;
  loadPopularLists: () => void;
}

class Users extends React.Component<Props> {
  componentDidMount = () => {
    this.props.loadUsers();
    this.props.loadPopularLists();
  };

  render = () => {
    const { usersIds, popularLists, loading } = this.props;

    return <UsersUi usersIds={usersIds} popularLists={popularLists} loading={loading} />;
  };
}

const mapStateToProps = createStructuredSelector({
  popularLists: selectPopularLists,
  usersIds: selectUsersCurrentIds,
  loading: selectUsersLoading,
});

export default connect(mapStateToProps, {
  loadUsers,
  loadPopularLists,
})(Users);
