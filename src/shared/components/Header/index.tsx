import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { logOut } from 'Modules/User/actions/logOut';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectUserLoggedIn } from 'Modules/User/selectors/selectUserLoggedIn';
import LanguagesSwitch from 'Components/LanguagesSwitch';
import { selectCurrentGlossary } from '../../redux/modules/Languages/selectors/selectCurrentGlossary';
import { GlossaryState } from '../../redux/modules/Languages/languages.types';

import './Header.less';

interface Props {
  isLogged: boolean;
  defaultCurrentSlug: string;
  currentGlossary: GlossaryState;
  logOut: () => void;
}

const Header: React.FC<Props> = ({ isLogged, defaultCurrentSlug, currentGlossary, logOut }) => {
  return (
    <header className={'Header'}>
      <nav className="Header-navigation">
        <Link className="Header-item" to={'/' + defaultCurrentSlug}>
          {currentGlossary.Home}
        </Link>
        {isLogged && (
          <>
            <Link className="Header-item" to={'/' + defaultCurrentSlug + '/control'}>
              {currentGlossary.Control}
            </Link>
            <Link className="Header-item" to={'/' + defaultCurrentSlug + '/login'} onClick={logOut}>
              {currentGlossary.LogOut}
            </Link>
          </>
        )}
        {!isLogged && (
          <Link className="Header-item" to={'/' + defaultCurrentSlug + '/login'}>
            {currentGlossary.Login}
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
  currentGlossary: selectCurrentGlossary,
});

export default connect(mapStateToProps, {
  logOut: logOut,
})(Header);
