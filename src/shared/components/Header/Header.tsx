import React from 'react';

import Logo from 'Assets/svg/logo.svg';
import User from 'Assets/svg/user.svg';
import A from 'Components/A';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { SessionState } from 'Modules/Session/session.types';
import { Flex, Frame, H3, SpinnerCircularBrute } from 'Vendor/components';

import './Header.less';

interface Props {
  routeName: string;
  isLogged: boolean;
  session: SessionState;
  currentGlossary: GlossaryState;
  loading: boolean;
  sessionLoading: boolean;
  switchUserModal: () => void;
  switchLoginModal: (mount: true) => void;
}

export const Header: React.FC<Props> = ({
  routeName,
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
      <Flex growVertical horizontal="between" vertical="stretch" noWrap>
        <Frame
          padding="small"
          className="Header-brand"
          borderBottom={false}
          borderTop={false}
          borderLeft={false}
          grow={false}
        >
          <A href={'/'} frontend underlined active={routeName === 'Home'} className="Header-link">
            <Flex horizontal="left" vertical="center" noWrap>
              <Logo className={'Header-logo' + (loading ? ' Header-logo--loading' : '')} />
              <H3 className="Header-title">Linking</H3>
            </Flex>
          </A>
        </Frame>
        <nav className="Header-navigation">
          <Flex growHorizontal growVertical horizontal="even" vertical="stretch" noWrap>
            <Frame
              className="Header-item Header-weather"
              grow
              borderBottom={false}
              borderTop={false}
              borderLeft={false}
            >
              <Flex horizontal="center" vertical="center">
                <A className="Header-link" href={'/bookmarks?'} frontend underlined active={routeName === 'Bookmarks'}>
                  <H3>{currentGlossary?.allBookmarks}</H3>
                </A>
              </Flex>
            </Frame>
            <Frame
              className="Header-item Header-weather"
              grow
              borderBottom={false}
              borderTop={false}
              borderLeft={false}
            >
              <Flex horizontal="center" vertical="center">
                <A className="Header-link" href={'/users'} frontend underlined active={routeName === 'Users'}>
                  <H3>All Users</H3>
                </A>
              </Flex>
            </Frame>
            <Frame
              className="Header-item Header-weather"
              grow
              borderBottom={false}
              borderTop={false}
              borderLeft={false}
            >
              <Flex horizontal="center" vertical="center">
                <A className="Header-link" href={'/tags'} frontend underlined active={routeName === 'Tags'}>
                  <H3>All Tags</H3>
                </A>
              </Flex>
            </Frame>
            <Frame
              className="Header-item Header-weather"
              grow
              borderBottom={false}
              borderTop={false}
              borderLeft={false}
            >
              <Flex horizontal="center" vertical="center">
                <A className="Header-link" href={'/lists'} frontend underlined active={routeName === 'Lists'}>
                  <H3>All Lists</H3>
                </A>
              </Flex>
            </Frame>
            <Frame padding="small" borderTop={false} borderRight={false} borderBottom={false} borderLeft={false}>
              <Flex className="Header-user" vertical="center" growHorizontal={false}>
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
                {sessionLoading && <SpinnerCircularBrute className="Header-loader" />}
              </Flex>
            </Frame>
          </Flex>
        </nav>
      </Flex>
    </Frame>
  </header>
);
