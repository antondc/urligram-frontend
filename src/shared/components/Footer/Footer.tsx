import React from 'react';

import A from 'Components/A';
import LanguageItem from 'Components/LanguageItem';
import LanguagesSwitch from 'Components/LanguagesSwitch';
import { RouteState } from 'Modules/Routes/routes.types';
import { SessionState } from 'Modules/Session/session.types';
import { Routes } from 'Router/routes';
import { Fade } from '@antoniodcorrea/components';

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
    <div className="Footer-left">
      {!session ? (
        <A className="Footer-link" href="sign-up" frontend underlined active={currentRoute?.name === Routes.Tags.name}>
          Sign up
        </A>
      ) : (
        <A
          className="Footer-link"
          href={Routes.ForgotPassword.route}
          frontend
          underlined
          active={currentRoute?.name === Routes.ForgotPassword.name}
        >
          Forgot password?
        </A>
      )}
      <A
        className="Footer-link"
        href={Routes.FAQ.route}
        frontend
        underlined
        active={currentRoute?.name === Routes.FAQ.name}
      >
        FAQ
      </A>
      {/*
    <div className="Footer-section">
        <A
          className="Footer-link"
          href={Routes.Download.route}
          frontend
          underlined
          active={currentRoute?.name === Routes.Download.name}
        >
          Download
        </A>
    </div>
    */}
      <A
        className="Footer-link"
        href={Routes.Disclaimer.route}
        frontend
        underlined
        active={currentRoute?.name === Routes.Disclaimer.name}
      >
        Disclaimer
      </A>
      <A
        className="Footer-link"
        href={Routes.Docs.route}
        frontend
        underlined
        active={currentRoute?.name === Routes.Docs.name}
      >
        Docs
      </A>
    </div>
    <div className="Footer-section Footer-lastSection">
      <Fade mounted={uiLanguagesModalMounted}>
        <LanguagesSwitch />
      </Fade>
      <LanguageItem lang={currentLanguageSlug} onClick={onLanguageItemClick} href={currentPathName} />
    </div>
  </div>
);
