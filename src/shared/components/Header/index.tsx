import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { logOut } from 'Modules/User/actions/logOut';
import { selectDefaultLanguageSlug } from '../../redux/modules/Languages/selectors/selectDefaultLanguageSlug';
import { selectUserLoggedIn } from '../../redux/modules/User/selectors/selectUserLoggedIn';
import './Header.less';

interface Props {
  isLogged: boolean;
  defaultLanguageSlug: string;
  logOut: () => void;
}

const Header: React.FC<Props> = ({ isLogged, defaultLanguageSlug, logOut }) => (
  <header className={'Header'}>
    <nav className="Header-navigation">
      <Link className="Header-item" to={'/' + defaultLanguageSlug}>
        Home
      </Link>
      {isLogged && (
        <>
          <Link className="Header-item" to={'/' + defaultLanguageSlug + '/control'}>
            Control
          </Link>
          <Link className="Header-item" to={'/' + defaultLanguageSlug + '/login'} onClick={logOut}>
            Log out
          </Link>
        </>
      )}
      {!isLogged && (
        <Link className="Header-item" to={'/' + defaultLanguageSlug + '/login'}>
          Login
        </Link>
      )}
    </nav>
  </header>
);

const mapStateToProps = createStructuredSelector({
  defaultLanguageSlug: selectDefaultLanguageSlug,
  isLogged: selectUserLoggedIn,
});

export default connect(mapStateToProps, {
  logOut: logOut,
})(Header);
