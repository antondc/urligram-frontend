import React from 'react';

// import Logo from 'Assets/svg/logo.svg';
import User from 'Assets/svg/user.svg';
import A from 'Components/A';
import Logo from 'Components/Logo';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { SessionState } from 'Modules/Session/session.types';
import { SpinnerCircularBrute } from 'Vendor/components';

import './Header.less';

interface Props {
  routeName: string;
  isLogged: boolean;
  session: SessionState;
  currentGlossary: GlossaryState;
  logoLoadingHeartBeat: boolean;
  logoLoadingColors: boolean;
  sessionLoading: boolean;
  switchUserModal: () => void;
  switchLoginModal: (mount: true) => void;
}

export const Header: React.FC<Props> = ({
  routeName,
  isLogged,
  switchUserModal,
  switchLoginModal,
  logoLoadingHeartBeat,
  logoLoadingColors,
  sessionLoading,
  session,
}) => (
  <header className="Header">
    <A className="Header-brand" href={'/'} frontend underlined active={routeName === 'Home'}>
      <Logo className="Header-logo" loadingBeat={logoLoadingHeartBeat} loadingColors={logoLoadingColors} />
      <h3 className="Header-title">Linking</h3>
    </A>
    <nav className="Header-navigation">
      <A className="Header-item" href={'/bookmarks?'} frontend underlined active={routeName === 'Bookmarks'}>
        <h3>Bookmarks</h3>
      </A>
      <A className="Header-item" href={'/users'} frontend underlined active={routeName === 'Users'}>
        <h3>Users</h3>
      </A>
      <A className="Header-item" href={'/tags'} frontend underlined active={routeName === 'Tags'}>
        <h3>Tags</h3>
      </A>
      <A className="Header-item" href={'/lists'} frontend underlined active={routeName === 'Lists'}>
        <h3>Lists</h3>
      </A>
    </nav>
    <div className="Header-user">
      {!sessionLoading && isLogged && (
        <img
          className="Header-userImage"
          src={session?.image?.original}
          onClick={isLogged ? switchUserModal : () => switchLoginModal(true)}
        />
      )}
      {!sessionLoading && !isLogged && (
        <User
          name="User"
          className={'Header-userLogo'}
          onClick={isLogged ? switchUserModal : () => switchLoginModal(true)}
        />
      )}
      {sessionLoading && <SpinnerCircularBrute className="Header-loader" speed="normal" />}
    </div>
  </header>
);
