import React from 'react';
import { Link } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import WithAuth from '../../common/WithAuth/WithAuth';
import { withRouter } from 'react-router';

import './Header.less';

class HeaderUi extends React.Component {
  render() {
    const {
      UserSession: { logged },
      Language,
      logOut,
    } = this.props;

    return (
      <header className={'Header'}>
        <nav className="Header-navigation">
          <Link className="Header-item" to={'/' + Language.slug}>
            Home
          </Link>
          {logged && (
            <>
              <Link className="Header-item" to="/control">
                Control
              </Link>
              <Link className="Header-item" to="/" onClick={logOut}>
                Log out
              </Link>
            </>
          )}
          {!logged && (
            <Link className="Header-item" to={'/' + Language.slug + '/login'}>
              Login
            </Link>
          )}
        </nav>
      </header>
    );
  }
}

export default withCookies(WithAuth(withRouter(HeaderUi)));
