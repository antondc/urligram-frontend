import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { ListState } from 'Modules/Lists/lists.types';
import { loadPopularLists } from 'Modules/Sections/actions/loadPopularLists';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { loadUsers } from 'Modules/Users/actions/loadUsers';
import { selectUsersCurrentIds } from 'Modules/Users/selectors/selectUsersCurrentIds';
import { selectUsersLoading } from 'Modules/Users/selectors/selectUsersLoading';
import { selectPopularListsLoading } from '../../redux/modules/Sections/selectors/selectPopularListsLoading';
import { UsersVisitor as UsersVisitorUi } from './UsersVisitor';

interface Props {
  usersIds: string[];
  popularLists: ListState[];
  usersLoading: boolean;
  popularListLoading: boolean;
  loadUsers: () => void;
  loadPopularLists: () => void;
}

class UsersVisitor extends React.Component<Props> {
  componentDidMount = () => {
    this.props.loadUsers();
    this.props.loadPopularLists();
  };

  render = () => {
    const { usersIds, popularLists, usersLoading, popularListLoading } = this.props;

    return (
      <UsersVisitorUi
        usersIds={usersIds}
        popularLists={popularLists}
        usersLoading={usersLoading}
        popularListLoading={popularListLoading}
      />
    );
  };
}

const mapStateToProps = createStructuredSelector({
  popularLists: selectPopularLists,
  usersIds: selectUsersCurrentIds,
  loading: selectUsersLoading,
  popularListLoading: selectPopularListsLoading,
});

export default connect(mapStateToProps, {
  loadUsers,
  loadPopularLists,
})(UsersVisitor);
