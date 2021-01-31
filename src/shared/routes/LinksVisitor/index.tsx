import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadLinks } from 'Modules/Links/actions/loadLinks';
import { selectLinksAllIds } from 'Modules/Links/selectors/selectLinksAllIds';
import { selectLinksLoading } from 'Modules/Links/selectors/selectLinksLoading';
import { ListState } from 'Modules/Lists/lists.types';
import { LinksVisitor as LinksVisitorUi } from './LinksVisitor';

interface Props {
  linksIds: number[];
  popularLists: ListState[];
  loading: boolean;
  loadLinks: () => void;
}

class Home extends React.Component<Props> {
  componentDidMount = () => {
    this.props.loadLinks();
  };

  render = () => {
    const { linksIds, popularLists, loading } = this.props;

    return <LinksVisitorUi linksIds={linksIds} popularLists={popularLists} loading={loading} />;
  };
}

const mapStateToProps = createStructuredSelector({
  linksIds: selectLinksAllIds,
  loading: selectLinksLoading,
});

export default connect(mapStateToProps, {
  loadLinks,
})(Home);
