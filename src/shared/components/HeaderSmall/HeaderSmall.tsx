import React from 'react';

import User from 'Assets/svg/user.svg';
import Logo from 'Components/Logo';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { SessionState } from 'Modules/Session/session.types';
import { Img, Spinner } from '@antoniodcorrea/components';

import './HeaderSmall.less';

interface Props {
  session: SessionState;
  sessionLoading: boolean;
  currentGlossary: GlossaryState;
  logoLoadingHeartBeat: boolean;
  logoLoadingColors: boolean;
  onUserClick: () => void;
}

export const HeaderSmall: React.FC<Props> = ({
  session,
  logoLoadingHeartBeat,
  logoLoadingColors,
  sessionLoading,
  onUserClick,
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
