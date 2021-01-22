import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadLists } from 'Modules/Lists/actions/loadLists';
import { ListState } from 'Modules/Lists/lists.types';
import { selectListsAllIds } from 'Modules/Lists/selectors/selectListsAllIds';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { Lists as ListsUi } from './Lists';

interface Props {
  listsIds: number[];
  popularLists: ListState[];
  loadLists: () => void;
}

class Lists extends React.Component<Props> {
  componentDidMount = () => {
    this.props.loadLists();
  };

  render = () => {
    const { listsIds, popularLists } = this.props;

    return <ListsUi listsIds={listsIds} popularLists={popularLists} />;
  };
}

const mapStateToProps = createStructuredSelector({
  listsIds: selectListsAllIds,
  popularLists: selectPopularLists,
});

export default connect(mapStateToProps, {
  loadLists,
})(Lists);
