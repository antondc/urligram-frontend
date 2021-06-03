import React from 'react';

import Logo from 'Assets/svg/logo.svg';
import User from 'Assets/svg/user.svg';
import A from 'Components/A';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { SessionState } from 'Modules/Session/session.types';
import { Flex, Frame, H3, SpinnerLoader } from 'Vendor/components';

import './Header.less';

interface Props {
  isLogged: boolean;
  session: SessionState;
  currentGlossary: GlossaryState;
  loading: boolean;
  sessionLoading: boolean;
  switchUserModal: () => void;
  switchLoginModal: (mount: true) => void;
}

export const Header: React.FC<Props> = ({
  isLogged,
  currentGlossary,
  switchUserModal,
  switchLoginModal,
  loading,
  sessionLoading,
  session,
}) => (
  <header>
    <Frame className="Header" padding="none">
      <Flex vertical="stretch">
        <Frame
          className="Header-item Header-weather"
          grow
          padding="small"
          borderBottom={false}
          borderTop={false}
          borderLeft={false}
        >
          <A className="Header-brand" href={'/'} frontend>
            <Logo className={'Header-logo' + (loading ? ' Header-logo--loading' : '')} />
            <H3 className="Header-title">Linking</H3>
          </A>
        </Frame>
        <nav className="Header-navigation">
          <Flex vertical="stretch">
            <Frame
              className="Header-item Header-weather"
              grow
              padding="small"
              borderBottom={false}
              borderTop={false}
              borderRight={false}
            >
              <A className="Header-link" href={'/bookmarks?'} frontend>
                <H3>{currentGlossary?.allBookmarks}</H3>
              </A>
            </Frame>
            <Frame
              className="Header-item Header-weather"
              grow
              padding="small"
              borderBottom={false}
              borderTop={false}
              borderRight={false}
            >
              <A className="Header-link" href={'/users'} frontend>
                <H3>All Users</H3>
              </A>
            </Frame>
            <Frame
              className="Header-item Header-weather"
              grow
              padding="small"
              borderBottom={false}
              borderTop={false}
              borderRight={false}
            >
              <A className="Header-link" href={'/tags'} frontend>
                <H3>All Tags</H3>
              </A>
            </Frame>
            <Frame
              className="Header-item Header-weather"
              grow
              padding="small"
              borderBottom={false}
              borderTop={false}
              borderRight={false}
            >
              <A className="Header-link" href={'/lists'} frontend>
                <H3>All Lists</H3>
              </A>
            </Frame>
          </Flex>
        </nav>
        <div className="Header-user">
          {!sessionLoading && isLogged && (
            <img
              className="Header-userLogo"
              src={session?.image?.original}
              onClick={isLogged ? switchUserModal : () => switchLoginModal(true)}
            />
          )}
          {!sessionLoading && !isLogged && (
            <User
              name="User"
              className={'Header-userLogo' + (isLogged ? ' Header-userLogo--isActive' : '')}
              onClick={isLogged ? switchUserModal : () => switchLoginModal(true)}
            />
          )}
          {sessionLoading && <SpinnerLoader className="Header-loader" />}
        </div>
      </Flex>
    </Frame>
  </header>
);
