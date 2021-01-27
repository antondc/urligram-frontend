import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadLists } from 'Modules/Lists/actions/loadLists';
import { ListState } from 'Modules/Lists/lists.types';
import { selectListsAllIds } from 'Modules/Lists/selectors/selectListsAllIds';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { ListsUser as ListsUserUi } from './ListsUser';

interface Props {
  listsIds: number[];
  popularLists: ListState[];
  loading: boolean;
  loadLists: () => void;
}

class ListsUser extends React.Component<Props> {
  componentDidMount = () => {
    this.props.loadLists();
  };

  render = () => {
    const { listsIds, popularLists, loading } = this.props;

    return <ListsUserUi listsIds={listsIds} popularLists={popularLists} loading={loading} />;
  };
}

const mapStateToProps = createStructuredSelector({
  listsIds: selectListsAllIds,
  popularLists: selectPopularLists,
  loading: selectListsLoading,
});

export default connect(mapStateToProps, {
  loadLists,
})(ListsUser);
