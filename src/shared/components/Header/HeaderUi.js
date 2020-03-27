import React from 'react';
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import WithAuth from '../../common/WithAuth/WithAuth';

import './Header.less';

class HeaderUi extends React.Component {
  render() {
    return (
      <header className={'Header'}>
        <nav className="Header-navigation">
          <Link className="Header-item" to={'/' + this.props.Language.slug}>
            Home
          </Link>
          <Link className="Header-item" to={'/' + this.props.Language.slug + '/login'}>
            Login
          </Link>
        </nav>
      </header>
    );
  }
}

export default withCookies(WithAuth(HeaderUi));
