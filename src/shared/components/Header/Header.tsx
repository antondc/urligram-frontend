import React from 'react';

import Logo from 'Assets/svg/logo.svg';
import User from 'Assets/svg/user.svg';
import A from 'Components/A';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { UserState } from 'Modules/Users/users.types';
import { Border, H3 } from 'Vendor/components';

import './Header.less';

interface Props {
  isLogged: boolean;
  sessionUser: UserState;
  currentGlossary: GlossaryState;
  loading: boolean;
  switchUserModal: () => void;
  switchLoginModal: (mount: true) => void;
}

export const Header: React.FC<Props> = ({
  isLogged,
  currentGlossary,
  switchUserModal,
  switchLoginModal,
  loading,
  sessionUser,
}) => (
  <header>
    <Border className="Header" weight="thick">
      <A className="Header-brand" href={'/'} frontend>
        <Logo className={'Header-logo' + (loading ? ' Header-logo--loading' : '')} />
        <H3 className="Header-title">Linking</H3>
      </A>
      <nav className="Header-navigation">
        <span className="Header-bar">|</span>
        <A className="Header-link" href={'/bookmarks?'} frontend>
          <H3>{currentGlossary?.bookmarks}</H3>
        </A>
        <span className="Header-bar">|</span>
        <A className="Header-link" href={'/users'} frontend>
          <H3>{currentGlossary?.users}</H3>
        </A>
        <span className="Header-bar">|</span>
        <A className="Header-link" href={'/lists'} frontend>
          <H3>{currentGlossary?.lists}</H3>
        </A>
      </nav>
      <div className="Header-user">
        {isLogged ? (
          <img
            className="Header-userLogo"
            src={sessionUser?.image?.original}
            onClick={isLogged ? switchUserModal : () => switchLoginModal(true)}
          />
        ) : (
          <User
            name="User"
            className={'Header-userLogo' + (isLogged ? ' Header-userLogo--isActive' : '')}
            onClick={isLogged ? switchUserModal : () => switchLoginModal(true)}
          />
        )}
      </div>
    </Border>
  </header>
);
