import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import A from 'Ui/A';
import { selectSessionLoggedIn } from 'Modules/Session/selectors/selectSessionLoggedIn';
import { switchUserModal } from 'Modules/Ui/actions/switchUserModal';
import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';

import { GlossaryState } from 'Modules/Languages/languages.types';
import H3 from 'Ui/H3';
import H4 from 'Ui/H4';
import User from 'Assets/svg/user.svg';
import Border from 'Ui/Border';
import Logo from 'Assets/svg/logo.svg';

import './Header.less';

interface Props {
  isLogged: boolean;
  currentGlossary: GlossaryState;
  currentLanguageSlug: string;
  switchUserModal: () => void;
  switchLoginModal: () => void;
}

const Header: React.FC<Props> = ({
  isLogged,
  currentGlossary,
  switchUserModal,
  currentLanguageSlug,
  switchLoginModal,
}) => {
  return (
    <header>
      <Border className="Header">
        <A className="Header-brand" href={'/' + currentLanguageSlug + '/'} styled={false}>
          <Logo className="Header-logo" />
          <H3 className="Header-title">Linking</H3>
        </A>
        <nav className="Header-navigation">
          <A className="Header-link" href={'/' + currentLanguageSlug + '/'}>
            <H4>{currentGlossary.Tags}</H4>
          </A>
          <A className="Header-link" href={'/' + currentLanguageSlug + '/login'}>
            <H4>{currentGlossary.Trending}</H4>
          </A>
          <A className="Header-link" href={'/' + currentLanguageSlug + '/control'}>
            <H4>{currentGlossary.Lists}</H4>
          </A>
        </nav>
        <div className="Header-user">
          <User
            name="User"
            className={'Header-userLogo' + (isLogged ? ' Header-userLogo--isActive' : '')}
            onClick={isLogged ? switchUserModal : switchLoginModal}
          />
        </div>
      </Border>
    </header>
  );
};

const mapStateToProps = createStructuredSelector({
  isLogged: selectSessionLoggedIn,
  currentGlossary: selectCurrentGlossary,
  currentLanguageSlug: selectCurrentLanguageSlug,
});

export default connect(mapStateToProps, {
  switchUserModal,
  switchLoginModal,
})(Header);
