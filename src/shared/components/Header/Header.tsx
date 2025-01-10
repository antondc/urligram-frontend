import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import Loupe from 'Assets/svg/loupe.svg';
import User from 'Assets/svg/user.svg';
import Logo from 'Components/Logo';
import UserModal from 'Components/UserModal';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { SessionState } from 'Modules/Session/session.types';
import { Img, Spinner } from '@antoniodcorrea/components';

import './Header.less';

interface Props {
  session: SessionState;
  currentGlossary: GlossaryState;
  sessionLoading: boolean;
  searchFormOpen: boolean;
  logoLoadingHeartBeat: boolean;
  logoLoadingColors: boolean;
  onUserClick: () => void;
  switchUiBookmarkModal: (e: React.FormEvent<HTMLElement>) => void;
  searchValue: string;
  onSearchInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onSearchCrossClick: () => void;
  onSearchSubmit: (e: React.FormEvent<HTMLElement> | React.MouseEvent<SVGElement>) => void;
  onSearchFormLeave: (e: React.FormEvent<HTMLElement>) => void;
  onSearchButtonClick: (e: React.FormEvent<HTMLElement>) => void;
}

export const Header: React.FC<Props> = ({
  session,
  currentGlossary,
  logoLoadingHeartBeat,
  logoLoadingColors,
  sessionLoading,
  searchFormOpen,
  onUserClick,
  switchUiBookmarkModal,
  searchValue,
  onSearchInputChange,
  onSearchCrossClick,
  onSearchSubmit,
  onSearchFormLeave,
  onSearchButtonClick,
}) => (
  <header className="Header">
    <div className="Header-content">
      <Logo className="Header-logo" loadingBeat={logoLoadingHeartBeat} loadingColors={logoLoadingColors} />
      <div className={'Header-search' + (searchValue ? ' Header-search--withValue' : '')}>
        <form
          className={'Header-searchForm Header-circleIcon' + (searchFormOpen ? ' Header-searchForm--open' : '')}
          onSubmit={onSearchSubmit}
          onClick={onSearchButtonClick}
        >
          <input
            className="Header-input"
            key={JSON.stringify(!!searchValue?.length)}
            placeholder={`${currentGlossary.search}…`}
            name="search"
            value={searchValue}
            onChange={onSearchInputChange}
            autoFocus={searchFormOpen}
            onBlur={onSearchFormLeave}
            autoComplete="off"
            type="text"
            spellCheck="false"
            size={1} // Fix for Firefox. Input width changes with font-size size https://stackoverflow.com/questions/49284045/why-does-font-size-increase-an-inputs-width
          />
          <Cross className="Header-searchCross" onClick={onSearchCrossClick} />
          <Loupe className="Header-searchLoupe" onClick={onSearchSubmit} />
        </form>
      </div>
      <div className="Header-addBoookmark Header-circleIcon" onClick={switchUiBookmarkModal}>
        <div className="Header-addBookmarkIcon">
          <Cross />
        </div>
      </div>
      <div className="Header-user Header-circleIcon">
        {!sessionLoading && session?.id && (
          <Img
            className="Header-userImage"
            src={session?.image?.original}
            title={`@${session?.name}`}
            alt={`@${session?.name}`}
            onClick={onUserClick}
          />
        )}
        {!sessionLoading && !session?.id && <User name="User" className="Header-userLogo" onClick={onUserClick} />}
        {sessionLoading && <Spinner className="Header-loader" size="big" />}
      </div>
      <UserModal />
    </div>
  </header>
);
