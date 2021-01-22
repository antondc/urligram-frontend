import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadLinks } from 'Modules/Links/actions/loadLinks';
import { selectLinksAllIds } from 'Modules/Links/selectors/selectLinksAllIds';
import { ListState } from 'Modules/Lists/lists.types';
import { Links as LinksUi } from './Links';

interface Props {
  linksIds: number[];
  popularLists: ListState[];
  loadLinks: () => void;
}

class Home extends React.Component<Props> {
  componentDidMount = () => {
    this.props.loadLinks();
  };

  render = () => {
    const { linksIds, popularLists } = this.props;

    return <LinksUi linksIds={linksIds} popularLists={popularLists} />;
  };
}

const mapStateToProps = createStructuredSelector({
  linksIds: selectLinksAllIds,
});

export default connect(mapStateToProps, {
  loadLinks,
})(Home);
