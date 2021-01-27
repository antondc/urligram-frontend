import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadLists } from 'Modules/Lists/actions/loadLists';
import { ListState } from 'Modules/Lists/lists.types';
import { selectListsAllIds } from 'Modules/Lists/selectors/selectListsAllIds';
import { selectListsLoading } from 'Modules/Lists/selectors/selectListsLoading';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { ListsVisitor as ListsVisitorUi } from './ListsVisitor';

interface Props {
  listsIds: number[];
  popularLists: ListState[];
  loading: boolean;
  loadLists: () => void;
}

class Lists extends React.Component<Props> {
  componentDidMount = () => {
    this.props.loadLists();
  };

  render = () => {
    const { listsIds, popularLists, loading } = this.props;

    return <ListsVisitorUi listsIds={listsIds} popularLists={popularLists} loading={loading} />;
  };
}

const mapStateToProps = createStructuredSelector({
  listsIds: selectListsAllIds,
  popularLists: selectPopularLists,
  loading: selectListsLoading,
});

export default connect(mapStateToProps, {
  loadLists,
})(Lists);
