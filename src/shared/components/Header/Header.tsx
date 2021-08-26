import React from 'react';

import BookmarkFilled from 'Assets/svg/bookmarkFilled.svg';
import List from 'Assets/svg/list.svg';
import Tag from 'Assets/svg/tag.svg';
import User from 'Assets/svg/user.svg';
import UserFill from 'Assets/svg/userFill.svg';
import A from 'Components/A';
import Logo from 'Components/Logo';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { SessionState } from 'Modules/Session/session.types';
import { SpinnerPie } from 'Vendor/components';

import './Header.less';

interface Props {
  routeName: string;
  session: SessionState;
  currentGlossary: GlossaryState;
  logoLoadingHeartBeat: boolean;
  logoLoadingColors: boolean;
  sessionLoading: boolean;
  onUserClick: () => void;
}

export const Header: React.FC<Props> = ({
  routeName,
  onUserClick,
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
      <A
        className={'Header-item' + (routeName === 'Bookmarks' ? ' Header-item--active' : '')}
        href={'/bookmarks?'}
        frontend
        underlined
        active={routeName === 'Bookmarks'}
      >
        <h3 className="Header-text">Bookmarks</h3>
        <BookmarkFilled className="Header-icon Header-iconBookmark" />
      </A>
      <A
        className={'Header-item' + (routeName === 'Users' ? ' Header-item--active' : '')}
        href={'/users'}
        frontend
        underlined
        active={routeName === 'Users'}
      >
        <h3 className="Header-text">Users</h3>
        <UserFill className="Header-icon Header-iconUser" />
      </A>
      <A
        className={'Header-item' + (routeName === 'Tags' ? ' Header-item--active' : '')}
        href={'/tags'}
        frontend
        underlined
        active={routeName === 'Tags'}
      >
        <h3 className="Header-text">Tags</h3>
        <Tag className="Header-icon Header-iconTag" />
      </A>
      <A
        className={'Header-item' + (routeName === 'Lists' ? ' Header-item--active' : '')}
        href={'/lists'}
        frontend
        underlined
        active={routeName === 'Lists'}
      >
        <h3 className="Header-text">Lists</h3>
        <List className="Header-icon Header-iconList" />
      </A>
    </nav>
    <div className="Header-user">
      {!sessionLoading && session?.id && (
        <img className="Header-userImage" src={session?.image?.original} onClick={onUserClick} />
      )}
      {!sessionLoading && !session?.id && <User name="User" className={'Header-userLogo'} onClick={onUserClick} />}
      {sessionLoading && <SpinnerPie className="Header-loader" size="big" />}
    </div>
  </header>
);
