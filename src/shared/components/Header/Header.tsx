import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import Loupe from 'Assets/svg/loupe.svg';
import User from 'Assets/svg/user.svg';
import Logo from 'Components/Logo';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { SessionState } from 'Modules/Session/session.types';
import { Img, Input, Spinner } from '@antoniodcorrea/components';

import './Header.less';

interface Props {
  session: SessionState;
  sessionLoading: boolean;
  currentGlossary: GlossaryState;
  logoLoadingHeartBeat: boolean;
  logoLoadingColors: boolean;
  onUserClick: () => void;
  switchUiBookmarkModal: (e: React.MouseEvent<HTMLDivElement>) => void;
  searchValue: string;
  onSearchInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onSearchCrossClick: () => void;
  onSearchSubmit: (e: React.FormEvent<HTMLElement> | React.MouseEvent<SVGElement>) => void;
}

export const Header: React.FC<Props> = ({
  session,
  logoLoadingHeartBeat,
  logoLoadingColors,
  sessionLoading,
  onUserClick,
  switchUiBookmarkModal,
  searchValue,
  onSearchInputChange,
  onSearchCrossClick,
  onSearchSubmit,
}) => (
  <header className="Header">
    <div className="Header-content">
      <Logo className="Header-logo" loadingBeat={logoLoadingHeartBeat} loadingColors={logoLoadingColors} />
      <form className={'Header-search' + (searchValue ? ' Header-search--withValue' : '')} onSubmit={onSearchSubmit}>
        <Input
          className="Header-input"
          placeholder="Search…"
          name="search"
          value={searchValue}
          onChange={onSearchInputChange}
          success={!!searchValue}
          grow
        />
        <Cross className="Header-searchCross" onClick={onSearchCrossClick} />
        <Loupe className="Header-searchLoupe" onClick={onSearchSubmit} />
      </form>
      <div className="Header-separator Header-separatorDesktop" />
      <div className="Header-addBoookmark" onClick={switchUiBookmarkModal}>
        <div className="Header-addBookmarkIcon">
          <Cross />
        </div>
        <span className="Header-addBookmarkText">Add Bookmark</span>
      </div>
      <div className="Header-separator" />
      <div className="Header-user">
        {!sessionLoading && session?.id && (
          <Img
            className="Header-userImage"
            src={session?.image?.original}
            title={session?.name}
            alt={session?.name}
            onClick={onUserClick}
          />
        )}
        {!sessionLoading && !session?.id && <User name="User" className="Header-userLogo" onClick={onUserClick} />}
        {sessionLoading && <Spinner className="Header-loader" size="big" />}
      </div>
    </div>
  </header>
);
