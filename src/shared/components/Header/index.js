import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import './Header.less';

class Header extends React.Component {
  render() {
    const {
      isLogged,
      Language: { slug },
      requestLogOut,
    } = this.props;

    return (
      <header className={'Header'}>
        <nav className="Header-navigation">
          <Link className="Header-item" to={'/' + slug}>
            Home
          </Link>
          {isLogged && (
            <>
              <Link className="Header-item" to="/control">
                Control
              </Link>
              <Link className="Header-item" to="/login" onClick={requestLogOut}>
                Log out
              </Link>
            </>
          )}
          {!isLogged && (
            <Link className="Header-item" to={'/' + slug + '/login'}>
              Login
            </Link>
          )}
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  Language: state.Languages,
  isLogged: !!state.User.id,
});

export default connect(mapStateToProps, {
  requestLogOut: actions.requestLogOut,
})(Header);
