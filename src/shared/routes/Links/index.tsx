import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadLinks } from 'Modules/Links/actions/loadLinks';
import { selectLinksAllIds } from 'Modules/Links/selectors/selectLinksAllIds';
import { ListState } from 'Modules/Lists/lists.types';
import { selectLinksLoading } from '../../redux/modules/Links/selectors/selectLinksLoading';
import { Links as LinksUi } from './Links';

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

    return <LinksUi linksIds={linksIds} popularLists={popularLists} loading={loading} />;
  };
}

const mapStateToProps = createStructuredSelector({
  linksIds: selectLinksAllIds,
  loading: selectLinksLoading,
});

export default connect(mapStateToProps, {
  loadLinks,
})(Home);
