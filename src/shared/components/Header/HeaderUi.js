import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { withRouter } from 'react-router';

import './Header.less';

class HeaderUi extends React.Component {
  render() {
    const {
      UserSession: { logged },
      Language,
      logOut_,
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
              <Link className="Header-item" to="/login" onClick={logOut_}>
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
  logOut_: actions.logOut,
})(withRouter(HeaderUi));
