import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import Loupe from 'Assets/svg/loupe.svg';
import User from 'Assets/svg/user.svg';
import Logo from 'Components/Logo';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { SessionState } from 'Modules/Session/session.types';
import { SpinnerPie } from 'Vendor/components';

import './Header.less';

interface Props {
  session: SessionState;
  sessionLoading: boolean;
  currentGlossary: GlossaryState;
  logoLoadingHeartBeat: boolean;
  logoLoadingColors: boolean;
  onUserClick: () => void;
  switchUiBookmarkModal: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Header: React.FC<Props> = ({
  session,
  logoLoadingHeartBeat,
  logoLoadingColors,
  sessionLoading,
  onUserClick,
  switchUiBookmarkModal,
}) => (
  <header className="Header">
    <div className="Header-content">
      <Logo className="Header-logo" loadingBeat={logoLoadingHeartBeat} loadingColors={logoLoadingColors} />
      <div className="Header-spacer" />
      <div className="Header-mockSearch">
        <Loupe className="Header-mockSearchIcon" />
      </div>
      <div className="Header-separator Header-separatorDesktop" />
      <div className="Header-addBoookmark" onClick={switchUiBookmarkModal}>
        <div className="Header-addBoookmarkIcon">
          <Cross />
        </div>
        <span className="Header-addBookmarkText">Add Bookmark</span>
      </div>
      <div className="Header-separator" />
      <div className="Header-user">
        {!sessionLoading && session?.id && (
          <img className="Header-userImage" src={session?.image?.original} onClick={onUserClick} />
        )}
        {!sessionLoading && !session?.id && <User name="User" className="Header-userLogo" onClick={onUserClick} />}
        {sessionLoading && <SpinnerPie className="Header-loader" size="big" />}
      </div>
    </div>
  </header>
);
