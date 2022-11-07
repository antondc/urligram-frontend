import React from 'react';

import Cross from 'Assets/svg/cross.svg';
import Loupe from 'Assets/svg/loupe.svg';
import User from 'Assets/svg/user.svg';
import Logo from 'Components/Logo';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { SessionState } from 'Modules/Session/session.types';
import { Img, Input, Spinner } from '@antoniodcorrea/components';

import './HeaderSmall.less';

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

export const HeaderSmall: React.FC<Props> = ({
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
  <header className="HeaderSmall">
    <Logo className="HeaderSmall-logo" loadingBeat={logoLoadingHeartBeat} loadingColors={logoLoadingColors} />
    <div className="HeaderSmall-user">
      {!sessionLoading && session?.id && (
        <Img
          className="HeaderSmall-userImage"
          src={session?.image?.original}
          alt={session?.name}
          title={session?.name}
          onClick={onUserClick}
        />
      )}
      {!sessionLoading && !session?.id && <User name="User" className="HeaderSmall-userLogo" onClick={onUserClick} />}
      {sessionLoading && <Spinner className="HeaderSmall-loader" size="big" />}
    </div>
  </header>
);
