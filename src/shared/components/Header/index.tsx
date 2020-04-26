import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { logOut } from 'Modules/User/actions/logOut';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectUserLoggedIn } from 'Modules/User/selectors/selectUserLoggedIn';
// import LanguagesSwitch from 'Components/LanguagesSwitch';
import { selectCurrentGlossary } from '../../redux/modules/Languages/selectors/selectCurrentGlossary';
import { GlossaryState } from '../../redux/modules/Languages/languages.types';
import { Border, H3, H4, User, Input } from '@antoniodcorrea/components';
import Logo from 'Assets/svg/logo.svg';

import './Header.less';

interface Props {
  isLogged: boolean;
  defaultCurrentSlug: string;
  currentGlossary: GlossaryState;
  logOut: () => void;
}

const Header: React.FC<Props> = ({ isLogged, defaultCurrentSlug, currentGlossary, logOut }) => {
  return (
    <header>
      <Border className="Header">
        <div className="Header-brand">
          <Logo className="Header-logo" />
          <H3>Linking</H3>
        </div>
        <nav className="Header-navigation">
          <Link className="Header-link" to="">
            <H4>Tags</H4>
          </Link>
          <Link className="Header-link" to="">
            <H4>Trending</H4>
          </Link>
          <Link className="Header-link" to="">
            <H4>Lists</H4>
          </Link>
        </nav>
        <User className="Header-user" />
      </Border>
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
