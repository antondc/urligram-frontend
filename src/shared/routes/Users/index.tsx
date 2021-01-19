import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ListState } from 'Modules/Lists/lists.types';
import { loadPopularLists } from 'Modules/Sections/actions/loadPopularLists';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { loadUsers } from 'Modules/Users/actions/loadUsers';
import { selectUsersCurrentIds } from 'Modules/Users/selectors/selectUsersCurrentIds';
import { Users as UsersUi } from './Users';

interface Props {
  usersIds: string[];
  popularLists: ListState[];
  loadUsers: () => void;
  loadPopularLists: () => void;
}

class Users extends React.Component<Props> {
  componentDidMount = () => {
    this.props.loadUsers();
    this.props.loadPopularLists();
  };

  render = () => {
    const { usersIds, popularLists } = this.props;

    return <UsersUi usersIds={usersIds} popularLists={popularLists} />;
  };
}

const mapStateToProps = createStructuredSelector({
  popularLists: selectPopularLists,
  usersIds: selectUsersCurrentIds,
});

export default connect(mapStateToProps, {
  loadUsers,
  loadPopularLists,
})(Users);
