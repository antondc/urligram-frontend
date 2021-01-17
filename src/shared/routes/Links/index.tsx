import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadLinks } from 'Modules/Links/actions/loadLinks';
import { selectLinksAllIds } from 'Modules/Links/selectors/selectLinksAllIds';
import { LinksUi } from './linksUi';

interface Props {
  linksIds: number[];
  loadLinks: () => void;
}

class Home extends React.Component<Props> {
  componentDidMount = () => {
    this.props.loadLinks();
  };

  render = () => {
    const { linksIds } = this.props;

    return <LinksUi linksIds={linksIds} />;
  };
}

const mapStateToProps = createStructuredSelector({
  linksIds: selectLinksAllIds,
});

export default connect(mapStateToProps, {
  loadLinks,
})(Home);
