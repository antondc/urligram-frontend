import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadLinks } from 'Modules/Links/actions/loadLinks.ts';
import { LinkState } from 'Modules/Links/links.types';
import { selectLinksAll } from 'Modules/Links/selectors/selectLinksAll';
import { LinksUi } from './linksUi';

interface Props {
  links: LinkState[];
  loadLinks: () => void;
}

class Home extends React.Component<Props> {
  componentDidMount = () => {
    this.props.loadLinks();
  };

  render = () => {
    const { links } = this.props;

    return <LinksUi links={links} />;
  };
}

const mapStateToProps = createStructuredSelector({
  links: selectLinksAll,
});

export default connect(mapStateToProps, {
  loadLinks,
})(Home);
