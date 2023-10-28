import React from 'react';

import A from 'Components/A';
import LanguageItem from 'Components/LanguageItem';
import LanguagesSwitch from 'Components/LanguagesSwitch';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { RouteState } from 'Modules/Routes/routes.types';
import { SessionState } from 'Modules/Session/session.types';
import { Routes } from 'Router/routes';
import { Fade } from '@antoniodcorrea/components';

import './Footer.less';

interface Props {
  glossary: GlossaryState;
  className?: string;
  session: SessionState;
  currentRoute: RouteState;
  currentLanguageSlug: string;
  uiLanguagesModalMounted: boolean;
  currentPathName: string;
  isMobile: boolean;
  onLanguageItemClick: () => void;
}

export const Footer: React.FC<Props> = ({
  glossary,
  className,
  session,
  currentRoute,
  currentLanguageSlug,
  uiLanguagesModalMounted,
  currentPathName,
  isMobile,
  onLanguageItemClick,
}) => (
  <div className={'Footer' + (className ? ` ${className}` : '')}>
    <div className="Footer-left">
      {!session?.id ? (
        <A className="Footer-link" href="sign-up" frontend underlined active={currentRoute?.name === Routes.Tags.name}>
          {glossary.signUp}
        </A>
      ) : (
        <A
          className="Footer-link"
          href={Routes.ForgotPassword.route}
          frontend
          underlined
          active={currentRoute?.name === Routes.ForgotPassword.name}
        >
          {glossary.forgotPassword}
        </A>
      )}
      {!isMobile && (
        <A
          className="Footer-link"
          href={`${Routes.Docs.route}#extension`}
          frontend
          underlined
          active={currentRoute?.name === `${Routes.Docs.route}#extension`}
        >
          {glossary.extension}
        </A>
      )}
      <A
        className="Footer-link"
        href={`${Routes.Docs.route}`}
        frontend
        underlined
        active={currentRoute?.name === Routes.Docs.name}
      >
        {glossary.docs}
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
