import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { logOut } from 'Modules/User/actions/logOut';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectUserLoggedIn } from 'Modules/User/selectors/selectUserLoggedIn';
import LanguagesSwitch from 'Components/LanguagesSwitch';

import './Header.less';

interface Props {
  isLogged: boolean;
  defaultCurrentSlug: string;
  logOut: () => void;
}

const Header: React.FC<Props> = ({ isLogged, defaultCurrentSlug, logOut }) => {
  return (
    <header className={'Header'}>
      <nav className="Header-navigation">
        <Link className="Header-item" to={'/' + defaultCurrentSlug}>
          Home
        </Link>
        {isLogged && (
          <>
            <Link className="Header-item" to={'/' + defaultCurrentSlug + '/control'}>
              Control
            </Link>
            <Link className="Header-item" to={'/' + defaultCurrentSlug + '/login'} onClick={logOut}>
              Log out
            </Link>
          </>
        )}
        {!isLogged && (
          <Link className="Header-item" to={'/' + defaultCurrentSlug + '/login'}>
            Login
          </Link>
        )}
        <LanguagesSwitch />
      </nav>
    </header>
  );
};

const mapStateToProps = createStructuredSelector({
  defaultCurrentSlug: selectCurrentLanguageSlug,
  isLogged: selectUserLoggedIn,
});

export default connect(mapStateToProps, {
  logOut: logOut,
})(Header);
