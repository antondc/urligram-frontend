import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

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
              <Link className="Header-item" to="/login" onClick={logOut}>
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

const mapStateToProps = state => ({
  Language: state.Language,
  NavigatedRoute: state.NavigatedRoute,
  UserSession: state.UserSession,
});

export default connect(mapStateToProps, {
  logOut: actions.logOut,
})(HeaderUi);
