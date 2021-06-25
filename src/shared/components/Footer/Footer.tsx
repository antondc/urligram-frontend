import React from 'react';

import A from 'Components/A';
import LanguageItem from 'Components/LanguageItem';
import LanguagesSwitch from 'Components/LanguagesSwitch';
import { RouteState } from 'Modules/Routes/routes.types';
import { SessionState } from 'Modules/Session/session.types';
import { Routes } from 'Router/routes';
import { Fade, Span } from 'Vendor/components';

import './Footer.less';

interface Props {
  session: SessionState;
  currentRoute: RouteState;
  currentLanguageSlug: string;
  uiLanguagesModalMounted: boolean;
  currentPathName: string;
  onLanguageItemClick: () => void;
}

export const Footer: React.FC<Props> = ({
  session,
  currentRoute,
  currentLanguageSlug,
  uiLanguagesModalMounted,
  currentPathName,
  onLanguageItemClick,
}) => (
  <div className="Footer">
    {!session ? (
      <div className="Footer-section">
        <Span size="medium" weight="extraBold">
          <A
            className="Footer-link"
            href="sign-up"
            frontend
            underlined
            active={currentRoute?.name === Routes.Tags.name}
          >
            Sign up
          </A>
        </Span>
      </div>
    ) : (
      <div className="Footer-section">
        <Span size="medium" weight="extraBold">
          <A
            className="Footer-link"
            href={Routes.ResetPassword.route}
            frontend
            underlined
            active={currentRoute?.name === Routes.ResetPassword.name}
          >
            Forgot password?
          </A>
        </Span>
      </div>
    )}
    <div className="Footer-section">
      <Span size="medium" weight="extraBold">
        <A
          className="Footer-link"
          href={Routes.FAQ.route}
          frontend
          underlined
          active={currentRoute?.name === Routes.FAQ.name}
        >
          FAQ
        </A>
      </Span>
    </div>
    <div className="Footer-section">
      <Span size="medium" weight="extraBold">
        <A
          className="Footer-link"
          href={Routes.Download.route}
          frontend
          underlined
          active={currentRoute?.name === Routes.Download.name}
        >
          Download
        </A>
      </Span>
    </div>
    <div className="Footer-section">
      <Span size="medium" weight="extraBold">
        <A
          className="Footer-link"
          href={Routes.Disclaimer.route}
          frontend
          underlined
          active={currentRoute?.name === Routes.Disclaimer.name}
        >
          Disclaimer
        </A>
      </Span>
    </div>
    <div className="Footer-section Footer-lastSection">
      <Fade mounted={uiLanguagesModalMounted}>
        <LanguagesSwitch />
      </Fade>
      <LanguageItem lang={currentLanguageSlug} onClick={onLanguageItemClick} href={currentPathName} />
    </div>
  </div>
);
